const updateArray = <T>(array:T[],value : T) :T[]   => {
  // code
  return array.includes(value)
 ?array : [...array, value]
}

// Строки
const stringArray = ["apple", "banana", "cherry"]
console.log(updateArray(stringArray, "banana")) // ['apple', 'banana', 'cherry']
console.log(updateArray(stringArray, "strawberry")) // ['apple', 'banana', 'cherry', 'strawberry']

// Числа
const numberArray = [1, 2, 3]
console.log(updateArray(numberArray, 2)) // [1, 2, 3]
console.log(updateArray(numberArray, 4)) // [1, 2, 3, 4]


/*
4. Реализация универсальной функции для работы с массивами с использованием дженериков (задача)
Необходимо создать дженериковую функцию, принимающую массив любого типа и
значение того же типа. Функция должна вернуть массив без изменений, если значение уже есть в массиве, а если нет - новый массив с добавленным значением.

  Требования:

функция должна быть дженериковой и работать с массивами любого типа;
для проверки наличия элемента в массиве используйте метод includes;
типы массива и элемента должны быть связаны через дженерики;
функция должна быть чистой (не должна изменять оригинальный массив):*/
