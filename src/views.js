import { getFilters } from './filters';
import { getTodos, toggleTodo, removeTodo } from './todos';

const renderTodos = () => {
  const todoEl = document.querySelector('#todos');
  const todos = getTodos();
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  todoEl.innerHTML = '';
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    todoEl.appendChild(messageEl);
  }
};

const generateTodoDOM = todo => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkEl = document.createElement('input');
  const textEl = document.createElement('span');
  const removeButton = document.createElement('button');

  checkEl.setAttribute('type', 'checkbox');
  checkEl.checked = todo.completed;
  checkEl.addEventListener('change', e => {
    toggleTodo(todo.id);
    renderTodos();
  });
  containerEl.appendChild(checkEl);

  // Setup the todo text
  textEl.textContent = todo.text;
  containerEl.appendChild(textEl);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement('h2');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};

export { renderTodos, generateTodoDOM, generateSummaryDOM };
