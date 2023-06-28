import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <div class="flex h-20 items-center justify-between bg-white shadow-sm lg:px-10 px-5 sticky top-0 left-0 right-0">
        <div>
          <span class="font-semibold text-lg">
            <span class="text-green-500">AI </span>Green
          </span>
        </div>
      </div>
      <div class="grow diagram flex flex-col">
        <Slot />
      </div>
    </div>
  );
});
