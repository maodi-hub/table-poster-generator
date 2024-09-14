
import { computed, inject } from "vue";
import { CONTAINER_SET_WIDTH_KEY, CONTAINER_WIDTH_KEY, POSTER_TAG, POSTER_TAG_SET_KEY } from "../../constants";

export function useContainer() {

  const posterTag = inject(POSTER_TAG, computed(() => ""));
  const handlePosterTagSet = inject(POSTER_TAG_SET_KEY, () => {});

  const width = document.body.clientWidth;
  const containerWidth = inject(
    CONTAINER_WIDTH_KEY,
    computed(() => width)
  );
  const handleContainerSetWidth = inject(CONTAINER_SET_WIDTH_KEY, null);
  
  const percent = computed({
    get() {
      return Math.ceil((containerWidth.value / width) * 100);
    },
    set(val) {
      handleContainerSetWidth?.(Math.ceil((val / 100) * width));
    },
  });
  
  const onWidthChange = (cur?: number) => {
    handleContainerSetWidth?.(cur || 0);
  };

  return {
    width,
    containerWidth,
    percent,
    onWidthChange,
    posterTag, 
    handlePosterTagSet
  }
}