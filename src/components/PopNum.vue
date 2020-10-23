<template>
  <section :class="{ mask: true, show: visible }">
    <aside class="pop-num">
      <span class="cell" v-for="n in 9" :key="n" @click="(e) => select(e, n)">
        {{ n }}
      </span>
      <span
        :class="['cell', cellMap[c]]"
        v-for="c in [-1, 0, -2]"
        :key="c"
        @click="(e) => select(e, c)"
      ></span>
    </aside>
  </section>
</template>

<script>
export default {
  name: "PopNum",
  emits: {
    select: (n) => {
      return [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
    },
    "update:visible": null,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, ctx) {
    const cellMap = {
      "-2": "mark2",
      "-1": "mark1",
      0: "empty",
    };
    function select(e, n) {
      ctx.emit("update:visible", false);
      ctx.emit("select", n);
    }
    return {
      cellMap,
      select,
    };
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.1s ease-in;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &.show {
    z-index: 100;
    opacity: 1;
  }
  .pop-num {
    width: 36vw;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    .cell {
      box-sizing: border-box;
      display: inline-block;
      width: 12vw;
      height: 12vw;
      line-height: 12vw;
      text-align: center;
      border: 1px solid #000;
      border-right-width: 0;
      border-bottom-width: 0;
      background-color: snow;
      &:nth-child(3n) {
        border-right-width: 1px;
      }
    }
    .mark1,
    .mark2,
    .empty {
      border-bottom-width: 1px;
    }
    .mark1 {
      background-color: lightsalmon;
    }
    .mark2 {
      background-color: lightgreen;
    }
  }
}
</style>
