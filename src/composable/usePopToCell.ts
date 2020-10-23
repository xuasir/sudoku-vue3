import { ref, reactive, Ref } from "vue";

export function usePopToCell(
  initialGrid: Ref<number[][]>,
  curGrid: Ref<number[][]>,
  marks: Ref<boolean[][]>
) {
  const popShow = ref(false);
  const clickPos = reactive({ col: -1, row: -1 });
  // 单元格点击
  function cellClick({ row, col }) {
    if (initialGrid.value[row][col] === 0) {
      popShow.value = true;
      clickPos.row = row;
      clickPos.col = col;
    }
  }
  // 填写数字
  function selectNum(n) {
    const { row, col } = clickPos;
    if (validPos(row, col)) {
      curGrid.value[row][col] = n;
      marks.value[row][col] = true;
    }
  }
  return {
    popShow,
    cellClick,
    selectNum,
  };
}

function validPos(row: number, col: number) {
  return row > -1 && row < 9 && col > -1 && col < 9;
}
