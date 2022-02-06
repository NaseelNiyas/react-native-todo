import { Box, Button, Input, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { TodoType } from '../types';
import { nanoid } from 'nanoid/non-secure';

const Todos = () => {
  const [newTodoName, setNewTodoName] = useState('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  const addTodo = async () => {
    if (newTodoName === '') {
      return;
    }
    const newTodo = {
      name: newTodoName,
      completed: false,
      id: nanoid(10),
    };
    try {
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      setNewTodoName('');
    } catch (err) {
    }
  };

  const handleChange = async (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    try {
      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (err) {
    }
  };

  const handleDelete = async (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const loadTodos = async () => {
    const todos = await AsyncStorage.getItem('todos');
    if (todos) {
      setTodos(JSON.parse(todos) || []);
    }
  };
  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <Box mt='3'>
      <ScrollView
        contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
        maxH={'90%'}
      >
        {todos?.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onChange={handleChange}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ScrollView>
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDir={'row'}
        bottom='0'
      >
        <Input
          placeholder='New Todo'
          value={newTodoName}
          onChangeText={(text) => setNewTodoName(text)}
          size={'lg'}
          px={'3'}
          py={'2'}
          minW={'1/2'}
          ml='1/5'
          borderRadius={'lg'}
        />
        <Button
          variant={'unstyled'}
          background={'blue.200'}
          borderRadius={'xl'}
          ml={'3'}
          onPress={addTodo}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Todos;
