const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')
const reset = document.getElementById('reset')

const listContent = [
  'China',
  'India',
  'United States',
  'Indonesia',
  'Pakistan',
  'Brazil',
  'Nigeria',
  'Bangladesh',
  'Russia',
  'Mexico'
]

let listItems = []

let dragStartIndex;

createList();

function createList() {
  [...listContent]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
      const listItem = document.createElement('li')

      listItem.setAttribute('data-index', `${index}`)
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="list-item">${item}</p>
      <i class="fas fa-grip-horizontal"></i>
    </div>
    `

      listItems.push(listItem)
      draggable_list.appendChild(listItem)
    })

  addEventListeners()
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}
function dragEnter() {
  this.classList.add('over')
}
function dragLeave() {
  this.classList.remove('over')
}
function dragOver(e) {
  e.preventDefault()
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function checkOrder() {
  listItems.forEach((listItem, index) => {

    const itemName = listItem.querySelector('.draggable').innerText.trim();
    if (itemName !== listContent[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

function resetOrder() {
  listItems.forEach(listItem => {
    draggable_list.removeChild(listItem)
  })
  listItems = []
  createList()

}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })

}

check.addEventListener('click', checkOrder)
reset.addEventListener('click', resetOrder)