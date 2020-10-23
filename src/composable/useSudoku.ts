import {
  makeGrid,
  remakeGrid,
  checker,
  marks,
  resetMarks,
} from "@xuguo/sudoku";
import { Ref, ref, shallowRef } from "vue";

export function useSudoku(level = 4) {
  let sudokuGrid = ref<number[][]>([]);
  let initialGrid = shallowRef<number[][]>([]);
  // 初始化
  init(makeGrid(level), sudokuGrid, initialGrid);
  // 重新生成问题棋盘
  function rebuild() {
    init(remakeGrid(), sudokuGrid, initialGrid);
    remark();
  }
  // marks
  let toMarks = ref(marks);
  // 检查正确性
  function checkSudoku(grid: number[][]) {
    const res = checker(grid);
    toMarks.value = marks.map((row) => row.slice());
    return res;
  }
  // 重新生成标记
  function remark() {
    resetMarks();
    toMarks.value = marks.map((row) => row.slice());
  }
  return {
    rebuild,
    checkSudoku,
    remark,
    grid: sudokuGrid,
    initialGrid,
    marks: toMarks,
  };
}

function init(arr: number[][], ref1: Ref<number[][]>, ref2: Ref<number[][]>) {
  const c = arr.map((row) => row.slice());
  ref1.value = arr;
  ref2.value = c;
}
