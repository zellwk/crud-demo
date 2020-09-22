/* eslint-env browser */
// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelectorAll('.delete-button')
const editButton = document.querySelectorAll('.edit-button')
const messageDiv = document.querySelector('#message')

// console.log(deleteButton)
// Node.List[button#delete-icon, button#delete-icon, button#delete-icon, ]

let input;

const editInput = document.querySelector('.edit-input')
editInput.addEventListener('change', e => {
  input = e.target.value;
})

editButton.forEach(item => {
  item.addEventListener('click', e => {
    fetch('/posts', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.value,
        post: input
      })
    })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
          window.location.reload(true)
        })
  })
})


// update.addEventListener('click', _ => {
//   fetch('/posts', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'Darth Vadar',
//       post: 'I find your lack of faith disturbing.'
//     })
//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(response => {
//       window.location.reload(true)
//     })
// })

deleteButton.forEach((item, index) => {
  item.addEventListener('click', e => {
    console.log(e.target.value)
    fetch('/posts', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.value
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No post to delete') {
          messageDiv.textContent = 'No Darth Vadar post to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
})

deleteButton.addEventListener('click', e => {
  console.log(e.target.value)
  fetch('/posts', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: e.target.value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No post to delete') {
        messageDiv.textContent = 'No Darth Vadar post to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
})
