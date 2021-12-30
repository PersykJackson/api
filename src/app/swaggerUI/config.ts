const config = {
  "swagger": "2.0",
  "info": {
    "description": "Stream API",
    "version": "1.0.0",
    "title": "Stream API",
    "contact": {
      "email": "greyjack32111@gmail.com"
    }
  },
  "host": "localhost:8021",
  "basePath": "/",
  "schemes": [
    "http"
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "login user",
        "description": "Login user",
        "operationId": "loginUser",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "Credentials",
            "description": "User login",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Login"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Bearer token"
          },
          "404": {
            "description": "Incorrect username or password!"
          },
          "421": {
            "description": "Username or password not found in request!"
          }
        }
      }
    },
    "/auth/registration": {
      "post": {
        "summary": "register user",
        "description": "Register user",
        "operationId": "registerUser",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "Credentials",
            "description": "User login",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Registration"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success!"
          },
          "400": {
            "description": "Invalid user!"
          },
          "520": {
            "description": "Database error!"
          }
        }
      }
    },
    "/streams/images?key={key}": {
      "get": {
        "summary": "get stream images",
        "description": "Get images",
        "operationId": "getImages",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "key",
            "description": "Stream key",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "File"
          },
          "404": {
            "description": "Image not found!"
          },
          "422": {
            "description": "Empty stream key!"
          }
        }
      }
    },
    "/streams": {
      "get": {
        "summary": "get list of streams",
        "description": "Get list of streams",
        "operationId": "getStreams",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "List of streams"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "seccurity": {
          "- bearerAuth": []
        }
      }
    }
  },
  "definitions": {
    "Login": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "format": "string"
        },
        "password": {
          "type": "string",
          "format": "string"
        }
      }
    },
    "Registration": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "format": "string"
        },
        "password": {
          "type": "string",
          "format": "string"
        }
      }
    },
    "StreamKey": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "format": "string"
        }
      }
    },
    "streams": {
      "type": "string"
    }
  }
}

export default config;
