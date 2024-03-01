<script lang="ts" setup>
import draggable from 'vuedraggable'

defineProps<{
  list: TierList
}>()

const drag = ref(false)

const { closeDialog } = useDialog()

function onRowDragStart() {
  drag.value = true
  closeActiveDialog()
}

function closeActiveDialog() {
  closeDialog()
}
</script>

<template>
  <draggable
    :list="list.tierRows"
    item-key="id"
    :group="{ name: 'tier-rows' }"
    handle=".handle"
    ghost-class="bg-gray-500"
    animation="200"
    :component-data="{
      name: !drag ? 'flip-list' : null,
      type: 'transition-group',
      class: drag ? 'cursor-move' : '',
    }"
    @start="onRowDragStart"
    @end="drag = false"
  >
    <!-- Tier rows -->
    <template #item="{ element: tierRow }">
      <TierRow :row="tierRow">
        <template #elements>
          <draggable
            :list="tierRow.elements"
            :group="{ name: 'tier-elements' }"
            item-key="id"
            animation="200"
            :component-data="{
              name: 'tier-element',
              type: 'transition-group',
              class: 'flex flex-row w-full items-start flex-wrap',
            }"
            @start="closeActiveDialog"
          >
            <!-- Tier elements -->
            <template #item="{ element: tierElement }">
              <TierElement :element="tierElement" />
            </template>
          </draggable>
        </template>
      </TierRow>
    </template>
  </draggable>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.tier-element-move {
  transition: transform 0.5s;
}
</style>
