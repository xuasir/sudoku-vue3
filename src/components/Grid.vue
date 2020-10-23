<template>
  <div
    :class="['row', `row-${i}`]"
    v-for="(row, i) in grid"
    :key="getRowKey(row, marks[i])"
  >
    <span
      v-for="(cell, j) in row"
      :key="getCellKey(i, j, cell, marks[i][j])"
      :class="{
        cell: true,
        [`cell-${j}`]: true,
        error: !marks[i][j],
        empty: cell === 0,
        mark1: cell === -1,
        mark2: cell === -2,
      }"
      @click="(e) => $emit('click', { row: i, col: j })"
    >
      {{ cell > 0 ? cell : "" }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "Grid",
  emits: {
    click: ({ row, col }) => {
      return row > -1 && row < 9 && col > -1 && col < 9;
    },
  },
  props: {
    grid: {
      type: Array,
      required: true,
    },
    marks: {
      type: Array,
      required: true,
    },
  },
  setup() {
    function getRowKey(g: number[], m: boolean[]): string {
      return g.join() + m.join();
    }
    function getCellKey(
      row: number,
      col: number,
      cell: number,
      mark: boolean
    ): string {
      return String(row) + String(col) + String(cell) + String(mark);
    }
    return {
      getRowKey,
      getCellKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  .cell {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 10vw;
    line-height: 10vw;
    width: 10vw;
    border: 1px solid #000;
    border-right-width: 0;
    border-bottom-width: 0;
    background-color: snow;
    &.cell-0 {
      border-left-width: 1.5px;
    }
    &.cell-2,
    &.cell-5,
    &.cell-8 {
      border-right-width: 1px;
    }
  }
  &.row-2,
  &.row-5 {
    .cell {
      border-bottom-width: 1.5px;
    }
  }
  &.row-8 {
    .cell {
      border-bottom-width: 1px;
    }
  }
  // 标记
  .error {
    color: red;
  }
  .empty {
    color: snow;
  }
  .mark1 {
    background-color: lightsalmon;
    color: #fff;
  }
  .mark2 {
    background-color: lightgreen;
    color: #fff;
  }
}
</style>
