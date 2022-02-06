import { Checkbox, Flex, Text } from 'native-base';
import { TodoType } from '../types';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import React from 'react';
interface TodoProps {
  todo: TodoType;
  onChange: (todo: string) => void;
  onDelete: (id: string) => void;
}
const Todo: React.FC<TodoProps> = ({ todo, onChange, onDelete }) => {
  const gh = (_e: GestureEvent<PanGestureHandlerEventPayload>) => {
    onDelete(todo.id);
  };
  return (
    <PanGestureHandler onGestureEvent={gh}>
      <Flex direction='row' minH={'10'}>
        <Checkbox
          value={todo.name}
          accessibilityLabel={todo.name}
          isChecked={todo.completed}
          onChange={() => onChange(todo.id)}
        ></Checkbox>
        <Text ml={'2'}>{todo.name}</Text>
      </Flex>
    </PanGestureHandler>
  );
};

export default Todo;
