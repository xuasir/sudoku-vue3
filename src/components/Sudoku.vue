<template>
  <header class="head">
    <h2>数独酷</h2>
  </header>
  <section class="content">
    <Grid :grid="grid" :marks="marks" @click="cellClick" />
  </section>
  <footer class="footer">
    <button type="button" @click="check">检查</button>
    <button type="button" @click="reset">重置</button>
    <button type="button" @click="clear">清理</button>
    <button type="button" @click="rebuild">重建</button>
  </footer>
  <Teleport :to="'body'">
    <PopNum v-model:visible="popShow" @select="selectNum" />
  </Teleport>
</template>

<script lang="ts">
import PopNum from "./PopNum.vue";
import Grid from "./Grid.vue";
import { useSudoku, usePopToCell } from "../composable";
import { isReactive } from "vue";

export default {
  name: "Sudoku",
  components: {
    PopNum,
    Grid,
  },
  setup() {
    const {
      grid,
      initialGrid,
      checkSudoku,
      marks,
      rebuild,
      remark,
    } = useSudoku();
    // 点选popnum逻辑
    const { popShow, cellClick, selectNum } = usePopToCell(
      initialGrid,
      grid,
      marks
    );

    function clear() {
      remark();
    }
    function reset() {
      const g = initialGrid.value;
      grid.value = g.map((row) => row.slice());
      remark();
    }
    function check() {
      checkSudoku(grid.value);
    }

    return {
      grid,
      marks,
      check,
      rebuild,
      clear,
      reset,
      popShow,
      cellClick,
      selectNum,
    };
  },
};
</script>

<style lang="scss" scoped>
.head {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  padding: 30px 0 0 10%;
  background-color: black;
  text-align: left;
  h2 {
    margin: 0;
    color: snow;
  }
}
.content {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 80px;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  button {
    float: left;
    width: 25%;
    height: 50px;
    border: 1px #000;
    border-bottom: 2px #000;
    background: transparent;
    color: snow;
    background-color: #000;
    outline: none;
    &:first-child {
      border-left: 2px #000;
    }
    &:last-child {
      border-right: 2px #000;
    }
  }
}
</style>
