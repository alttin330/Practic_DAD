const apiUrl = 'http://localhost:9000/graphql';

document.getElementById('addItem').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const query = `
    mutation {
      addItem(name: "${name}", description: "${description}") {
        id
        name
        description
      }
    }
  `;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    getItems();
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('updateItem').addEventListener('click', () => {
  const id = document.getElementById('updateId').value;
  const name = document.getElementById('updateName').value;
  const description = document.getElementById('updateDescription').value;

  const query = `
    mutation {
      updateItem(id: "${id}", name: "${name}", description: "${description}") {
        id
        name
        description
      }
    }
  `;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    getItems();
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('deleteItem').addEventListener('click', () => {
  const id = document.getElementById('deleteId').value;

  const query = `
    mutation {
      deleteItem(id: "${id}") {
        id
        name
        description
      }
    }
  `;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    getItems();
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('getItems').addEventListener('click', () => {
  getItems();
});

function getItems() {
  const query = `
    query {
      getItems {
        id
        name
        description
      }
    }
  `;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  .then(response => response.json())
  .then(data => {
    const items = data.data.getItems;
    const tableBody = document.querySelector('#itemsTable tbody');
    tableBody.innerHTML = '';

    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Error:', error));
}
