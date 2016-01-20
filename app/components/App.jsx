import React from 'react';
import uuid from 'node-uuid'; 
import Notes from './Notes.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'A task'
                },
                {
                    id: uuid.v4(),
                    task: 'B task'
                },
                {
                    id: uuid.v4(),
                    task: 'C task'
                }
            ]
        };
    }

    addNote =() => {

        // one way
        const notes = [...this.state.notes, {id:uuid.v4(), task: 'new task'}];
        this.setState({notes})

        // second way
        // this.setState({
        //     notes: this.state.notes.concat([{
        //         id: uuid.v4(),
        //         task: 'new task'
        //     }])
        // })
    }

    editNote = (id, task) => {
        const notes = this.state.notes.map((note) => {
            if(note.id === id && task) {
                note.task = task
            }

            return note
        });

        this.setState({notes})
    }

    deleteNote = (id) => {
        this.setState({
            notes: this.state.notes.filter((note) => note.id !== id)
        })
    }

    render() {
        const notes = this.state.notes;

        return (
            <div>
                <button className="add-Note" onClick={this.addNote}>+</button>
                <Notes 
                    notes={notes} 
                    onEdit={this.editNote} 
                    onDelete={this.deleteNote} />
            </div>
        )
    }
}
