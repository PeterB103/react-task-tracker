from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from datetime import datetime
from flask_cors import CORS, cross_origin
import json

#Set up application
app = Flask(__name__)
#configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
#init database
db = SQLAlchemy(app)

#CORS: Enable cross port calls
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


class Todo(db.Model):
    
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String(200), nullable = False)
    date_created = db.Column(db.String(200), nullable= False) #add in some sort of date picker can be bootstrap or html
    reminder = db.Column(db.Boolean, default = False)

    def toJSON(self): #used for python stereilization (to make things into json)
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

    def __repr__(self):
      return '<Task %r>' % self.id

    def __json__(self):
        return {"id": self.id, "text": self.content, "day": self.date_created, "reminder":self.reminder}

#created the db
#db.create_all()

#Create an Index route
@app.route('/', methods =["POST", "GET", "DELETE"])
@cross_origin()
def index():
    #adding a task
    #Form: Referes to the HTML content type
    #Json: Referes to the JSON content type
    if request.method == 'POST':
        task_content = request.json['content'] #gets content from the reminder in json format
        task_day = request.json['day'] #gets the day in json format
        task_reminder = request.json['reminder'] #gets the reminder status in json format

        #creates a Todo object and fills in data types
        new_task = Todo(
            content=task_content, 
            date_created = task_day, 
            reminder = task_reminder
        ) 

        try:
            db.session.add(new_task)
            db.session.commit()
            #Query needed here b/c needs to return the tasks that have been added
            pass
            #return jsonify(new_task) #returning the task that was just added

        #except Exception as e: print(e) -> prints the actual exception    
        except Exception as e:
            print(e)
            return jsonify('There was an issue adding your task')

   
    #ordering queries by date creates and grabbing them all
    #use .first to only show the first
    tasks = Todo.query.order_by(Todo.date_created).all()
    return jsonify([task.__json__() for task in tasks]) #returns all of the tasks by stereilizing through the json method


#@app.route('/', methods =["POST", "GET"])
@app.route('/delete/<int:_id>', methods = ["DELETE"]) #gets the ID of the tasks
@cross_origin()
def delete(_id): #Needs the underscore b/c id is apart of python syntax could cause naming collision
    #deleting a task
    task_to_delete = Todo.query.get_or_404(_id) #attempt to get task for id or 404

    try:
        db.session.delete(task_to_delete) #actually deletes the task
        db.session.commit() #commit the changes 
        return jsonify({})

    #except Exception as e: print(e) -> prints the actual exception    
    except Exception as e:
        print(e)
        return jsonify('There was an issue adding your task')




if __name__ == "__main__":
    app.run(debug=True)