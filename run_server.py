from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from flasgger import Swagger
import random

app = Flask(__name__)
Swagger(app)
CORS(app)

DB_FOLDER = 'data'
DB_FILE = os.path.join(DB_FOLDER, 'widgets_db.json')

def load_data():
    if not os.path.exists(DB_FOLDER):
        os.makedirs(DB_FOLDER)
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_data(data):
    if not os.path.exists(DB_FOLDER):
        os.makedirs(DB_FOLDER)
    with open(DB_FILE, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/widget/<string:page_name>', methods=['GET'])
def get_widgets(page_name):
    """
    Get all widgets for a specific page
    ---
    parameters:
      - name: page_name
        in: path
        type: string
        required: true
        description: The name of the page
    responses:
      200:
        description: List of widgets retrieved successfully
    """
    data = load_data()
    widgets = data.get(page_name, [])
    return jsonify(widgets), 200

@app.route('/widget', methods=['POST'])
def add_widget():
    """
    Add a new widget
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - page_name
            - id
          properties:
            page_name:
              type: string
            id:
              type: string
            header:
              type: string
            text:
              type: string
            thumbnail:
              type: string
            price:
              type: string
            showToPercentage:
              type: integer
              description: Percentage of users this widget should be shown to
    responses:
      201:
        description: Widget added successfully
      400:
        description: Bad request
    """
    data = load_data()
    new_widget = request.json
    page_name = new_widget.get('page_name')

    if not page_name or not new_widget.get('id'):
        return jsonify({'error': 'Page name and widget ID are required'}), 400

    if page_name in data:
        if isinstance(data[page_name], list):
            data[page_name].append(new_widget)
        else:
            data[page_name] = [data[page_name], new_widget]
    else:
        data[page_name] = [new_widget]

    save_data(data)
    return jsonify({'message': 'Widget added successfully'}), 201

@app.route('/widget/<string:page_name>/<string:widget_id>', methods=['PUT'])
def update_widget(page_name, widget_id):
    """
    Update an existing widget by ID
    ---
    parameters:
      - name: page_name
        in: path
        type: string
        required: true
        description: The name of the page
      - name: widget_id
        in: path
        type: string
        required: true
        description: The ID of the widget
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            header:
              type: string
            text:
              type: string
            thumbnail:
              type: string
            price:
              type: string
            showToPercentage:
              type: integer
              description: Updated visibility percentage
    responses:
      200:
        description: Widget updated successfully
      404:
        description: Widget not found
    """
    data = load_data()
    updated_widget = request.json

    if page_name not in data:
        return jsonify({'error': 'Page not found'}), 404

    widgets = data[page_name]
    if isinstance(widgets, list):
        for idx, widget in enumerate(widgets):
            if widget.get('id') == widget_id:
                data[page_name][idx].update(updated_widget)
                save_data(data)
                return jsonify({'message': 'Widget updated successfully'}), 200
        return jsonify({'error': 'Widget with given ID not found'}), 404
    else:
        if widgets.get('id') == widget_id:
            data[page_name].update(updated_widget)
            save_data(data)
            return jsonify({'message': 'Widget updated successfully'}), 200
        return jsonify({'error': 'Widget with given ID not found'}), 404

@app.route('/widget/<string:page_name>/<string:widget_id>', methods=['DELETE'])
def delete_widget(page_name, widget_id):
    """
    Delete a widget by ID
    ---
    parameters:
      - name: page_name
        in: path
        type: string
        required: true
        description: The name of the page
      - name: widget_id
        in: path
        type: string
        required: true
        description: The ID of the widget
    responses:
      200:
        description: Widget deleted successfully
      404:
        description: Widget not found
    """
    data = load_data()

    if page_name not in data:
        return jsonify({'error': 'Page not found'}), 404

    widgets = data[page_name]
    if isinstance(widgets, list):
        data[page_name] = [widget for widget in widgets if widget.get('id') != widget_id]
        if not data[page_name]:
            del data[page_name]
        save_data(data)
        return jsonify({'message': 'Widget deleted successfully'}), 200
    else:
        if widgets.get('id') == widget_id:
            del data[page_name]
            save_data(data)
            return jsonify({'message': 'Widget deleted successfully'}), 200
        return jsonify({'error': 'Widget with given ID not found'}), 404

@app.route('/widgets', methods=['GET'])
def get_all_widgets():
    """
    Get all widget data
    ---
    responses:
      200:
        description: All widget data retrieved successfully
    """
    data = load_data()
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
