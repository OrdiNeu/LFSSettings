/*import React from 'React';*/
class ApplyBtn extends React.Component {
  render() {
    return (
      <button>
        Hi there yo
      </button>
    );
  }
}

const btnDOMContainer = document.querySelector('#123');

ReactDOM.render(
  <ApplyBtn />,
  btnDOMContainer
);