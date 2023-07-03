import {
  $,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import "gridstack/dist/gridstack.min.css";
import { GridItemHTMLElement, GridStack, Utils } from "gridstack";

export default component$(() => {
  const state = useStore<{
    grid: any;
  }>({
    grid: null,
  });

  const components = [
    {
      name: "Tandon",
      image: "https://cdn-icons-png.flaticon.com/512/2399/2399504.png",
    },
    {
      name: "Pompa",
      image: "https://cdn-icons-png.flaticon.com/512/2226/2226103.png",
    },
    {
      name: "Katup",
      image: "https://cdn-icons-png.flaticon.com/512/148/148298.png",
    },
    {
      name: "Sensor",
      image: "https://cdn-icons-png.flaticon.com/512/6375/6375838.png",
    },
  ];

  const gridSave = $(() => {
    const data = state.grid.save();

    const newData = data.map((item: any, i: number) => {
      item["id"] = i + 1;
      return item;
    });

    const text = JSON.stringify(newData);
    navigator.clipboard.writeText(text);
  });

  useVisibleTask$(() => {
    const grid = GridStack.init({
      float: true,
      acceptWidgets: true,
      removable: "#trash",
      disableResize: true,
    });

    grid.load([
      {
        w: 3,
        x: 9,
        y: 0,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/6375/6375838.png" alt="Sensor" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Sensor</div></div>',
        id: "1",
      },
      {
        w: 3,
        x: 4,
        y: 1,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/2226/2226103.png" alt="Pompa" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Pompa</div></div>',
        id: "2",
      },
      {
        w: 3,
        x: 0,
        y: 2,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/2399/2399504.png" alt="Tandon" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Tandon</div></div>',
        id: "3",
      },
      {
        w: 3,
        x: 8,
        y: 2,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/148/148298.png" alt="Katup" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Katup</div></div>',
        id: "4",
      },
      {
        w: 3,
        x: 4,
        y: 3,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/2226/2226103.png" alt="Pompa" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Pompa</div></div>',
        id: "5",
      },
      {
        w: 3,
        x: 8,
        y: 4,
        content:
          '<div class="bg-white shadow rounded flex w-[220px] items-center p-3" data-qwik-inspector="routes/v2/index.tsx:74:21"><img width="35" height="35" src="https://cdn-icons-png.flaticon.com/512/148/148298.png" alt="Katup" data-qwik-inspector="routes/v2/index.tsx:75:23"><div class="grow flex-1 pl-4" data-qwik-inspector="routes/v2/index.tsx:81:23">Katup</div></div>',
        id: "6",
      },
    ]);

    state.grid = noSerialize(grid);

    GridStack.setupDragIn(".node-component", {
      appendTo: "body",
      helper: (event: Partial<DragEvent>) => {
        const id: any = Date.now();
        const target = event.target as GridItemHTMLElement;
        target.parentElement?.setAttribute("gs-id", id);

        const clone = Utils.cloneNode(target);
        return clone;
      },
    });
  });

  return (
    <div class="p-5 relative">
      <div class="flex">
        <div class="w-auto">
          <div class="bg-white rounded-lg shadow h-full p-5">
            <button
              type="button"
              class="bg-green-500 mb-10 w-full text-white px-4 p-3 rounded shadow"
              onClick$={gridSave}
            >
              Simpan
            </button>
            {components.map((item, i) => (
              <div class="mb-4" key={i}>
                <div class="grid-stack-item node-component">
                  <div class="grid-stack-item-content">
                    <div class="bg-white shadow rounded flex w-[220px] items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={35}
                        height={35}
                        class="m-3"
                      />
                      <div class="grow flex-1 pl-4">{item.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              class="bg-red-100 border border-red-500 flex items-center justify-center h-20 w-[220px] rounded-lg shadow mt-10 space-x-1"
              id="trash"
            >
              <span class="text-red-500">Drop ke sini</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="grow flex-1 px-5 min-h-screen">
          <div class="grid-stack rounded-lg bg-opacity-50 min-h-screen"></div>
        </div>
      </div>
    </div>
  );
});
