import React from 'react';

const SortPanel = () => {
  return (
    <div>
      <button onClick={this.onSubmit}>Удиви меня!</button>
      <span>Сортировать:</span>
      <button onClick={this.onSubmit}>По цене</button>
      <button onClick={this.onSubmit}>По каллорийности</button>

    </div>
  );
}


export default SortPanel;