import React from 'react';
import ReactDOM from 'react-dom';
 
class Editor extends React.Component {
  render() {
    return (
        <div className="editor">
            <div className="tools">
                <pre id="html"></pre>
                <pre id="css"></pre>
            </div>
            <div id="preview"></div>
        </div>
    );
  }
}
 
ReactDOM.render(<Editor/>, document.getElementById('root'));
