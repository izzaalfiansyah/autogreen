import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import go from "gojs";
import images from "~/components/images";

export default component$(() => {
  const element = useSignal<Element>();

  const generate = $(() => {
    const gg = go.GraphObject.make;

    const diagram = new go.Diagram(element.value, {
      "undoManager.isEnabled": true,
      allowCopy: false,
      allowDelete: false,
      layout: new go.TreeLayout({ layerSpacing: 100 }),
    });

    function statusColor(status: any) {
      return ["red", "lime"][status];
    }

    diagram.nodeTemplate = gg(
      go.Node,
      "Horizontal",
      {
        background: "white",
        toolTip: gg(
          "ToolTip",
          {
            background: "white",
          },
          gg(go.TextBlock, {
            margin: 5,
            stroke: "black",
            font: "12px Poppins",
          }).bind("text", "tooltip")
        ),
      },
      gg(go.Shape, {
        stroke: "red",
        strokeWidth: 5,
        width: 0,
      }).bind("stroke", "status", statusColor),
      gg(go.Picture, {
        margin: new go.Margin(20, 20, 20, 28),
        width: 80,
        height: 80,
      }).bind("source"),
      gg(go.TextBlock, {
        margin: new go.Margin(0, 30, 0, 10),
        stroke: "black",
        font: "16px Poppins",
      }).bind("text", "name")
    );

    diagram.toolManager.hoverDelay = 100;

    diagram.linkTemplate = new go.Link({
      routing: go.Link.Default,
      corner: 3,
    })
      .add(gg(go.Shape, { strokeWidth: 1.5, stroke: "darkgray" }))
      .add(
        gg(go.Shape, { toArrow: "Standard", fill: "darkgray", stroke: null })
      );

    diagram.model = new go.GraphLinksModel(
      [
        {
          key: 1,
          name: "Pompa Tandon",
          source: images.tandon,
          tooltip: "Status: Stopped \nTemp: 80c \nFlow: 0/ms",
          status: 0,
        },
        {
          key: 2,
          name: "Pompa 1",
          source: images.pompa,
          tooltip: "Status: Running \nFlow: 0/ms",
          status: 1,
        },
        {
          key: 3,
          name: "Pompa 2",
          source: images.pompa,
          tooltip: "Status: Stopped \nFlow: 0/ms",
          status: 0,
        },
        {
          key: 4,
          name: "Katup 1",
          source: images.katup,
          tooltip: "Status: Running \nFlow: 0/ms",
          status: 1,
        },
        {
          key: 5,
          name: "Katup 2",
          source: images.katup,
          tooltip: "Status: Stopped \nFlow: 0/ms",
          status: 0,
        },
        {
          key: 6,
          name: "Sensor",
          source: images.sensor,
          tooltip: "Status: Running",
          status: 1,
        },
      ],
      [
        {
          from: 1,
          to: 2,
        },
        {
          from: 1,
          to: 3,
        },
        {
          from: 2,
          to: 4,
        },
        {
          from: 3,
          to: 4,
        },
        {
          from: 3,
          to: 5,
        },
      ]
    );
  });

  useVisibleTask$(() => {
    generate();
  });

  return <div ref={element} id="diagram" class="relative grow"></div>;
});
