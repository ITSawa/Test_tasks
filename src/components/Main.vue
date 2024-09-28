<template>
  <main>
    <div class="container">
      <div class="toDoList">
        <ul>
          <li v-if="toDoItems.length === 0" class="noTasks">
            <span>Скорее запланируй что-то!</span>
          </li>
          <li v-for="(item, index) in toDoItems" :key="index" :class="{ completed: item.completed }" class="toDoItem">
            <span style="max-width: calc(100% - 60px);">{{ item.text }}</span>
            <div class="buttonGroup">
              <button @click="toggleComplete(index)">
                <i class="fas fa-check"></i>
              </button>
              <button @click="editToDo(index)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="removeToDo(index)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="toDoCreater">
        <textarea v-model="newToDo" placeholder="Сделать что-то..." class="inputField"></textarea>
        <button @click="addToDo" class="addButton" :disabled="!newToDo.trim()">Добавить</button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'MainPage',
  setup() {
    const newToDo = ref('');
    const toDoItems = ref([]);

    onMounted(() => {
      const storedToDoItems = localStorage.getItem('toDoItems');
      if (storedToDoItems) {
        toDoItems.value = JSON.parse(storedToDoItems);
      }
    });

    const addToDo = () => {
      if (newToDo.value.trim()) {
        const storedToDoItems = localStorage.getItem('toDoItems');
        let listOfToDoItems;

        if (storedToDoItems && typeof storedToDoItems === 'string') {
          listOfToDoItems = JSON.parse(storedToDoItems);
        } else {
          listOfToDoItems = [];
        }

        listOfToDoItems.push({ text: newToDo.value.trim(), completed: false });
        localStorage.setItem('toDoItems', JSON.stringify(listOfToDoItems));
        toDoItems.value.push({ text: newToDo.value.trim(), completed: false });
        newToDo.value = '';
      }
    };

    const toggleComplete = (index) => {
      toDoItems.value[index].completed = !toDoItems.value[index].completed;
      updateLocalStorage();
    };

    const removeToDo = (index) => {
      toDoItems.value.splice(index, 1);
      updateLocalStorage();
    };

    const editToDo = (index) => {
      newToDo.value = toDoItems.value[index].text;
      removeToDo(index);
    };

    const updateLocalStorage = () => {
      localStorage.setItem('toDoItems', JSON.stringify(toDoItems.value));
    };

    return {
      newToDo,
      toDoItems,
      addToDo,
      toggleComplete,
      removeToDo,
      editToDo
    };
  }
}
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

*:not(i) {
  font-weight: 800;
  font-family: 'Roboto', sans-serif;
}

.container {
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.toDoList {
  margin-bottom: 20px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.toDoItem {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffa963;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  color: white;
}

.noTasks {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  margin: 10px 0;
}

.toDoItem:hover {
  background-color: #ffa845;
}

.completed {
  text-decoration: line-through;
  color: #888;
  background-color: #f8f9fa;
}

.completed:hover {
  background-color: #f0f0f0;
}

.buttonGroup {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
}

button {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: rgb(34, 34, 34);
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ebeaea;
}

.toDoCreater {
  display: flex;
  flex-direction: column;
}

.inputField {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  resize: none;
}

.addButton {
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #ff8c00;
}

.addButton:hover {
  background-color: #ff7f00;
}

.addButton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
