window.data_grid = [];
      window.data_line = [];

      window.lines = [];
      window.lineBefore = null;
      window.lineTargetBefore = null;

      document.addEventListener("alpine:init", () => {
        Alpine.data("state", () => ({
          init() {
            setTimeout(this.updateDevice, 800);
            setInterval(() => {
              if (!this.modalOpen) {
                this.updateDevice();
              }
            }, 3000);
          },
          mode: "move",
          components: [
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
          ],
          perangkat: {
            oldId: "",
            id: "",
            nama: "",
            status: "",
            flow: "",
            temperatur: "",
          },
          modalOpen: false,
          notifikasi: {
            message: "Berhasil",
            success: true,
            show: false,
          },
          async save() {
            const data_grid = window.data_grid.save();
            const data_line = window.data_line;

            const data = {
              grid: data_grid,
              line: data_line,
            };

            let perangkat = [];
            document.querySelectorAll('[gs-id]').forEach((item) => {
              const id = item.getAttribute('gs-id');
              const nama = item.children[1].innerText;

              perangkat.push({
                id, nama,
              });
            });

            console.log(perangkat);

            await axios.post("./api/skema.php?create=1", data);
            this.notif("Perubahan berhasil disimpan");
          },
          async updateDevice() {
            const res = await axios.get("./api/perangkat.php");

            let stoppedDeviceId = [];
            res.data.data.forEach((item) => {
              const perangkat = document.querySelector(
                `[gs-id="${item.gsId}"]`
              );

              if (perangkat) {
                perangkat.setAttribute("gs-status", item.status);
                perangkat.setAttribute("gs-flow", item.flow);
                perangkat.setAttribute("gs-temperatur", item.temperatur);

                perangkat.classList.remove("border-green-500");
                perangkat.classList.remove("border-red-500");
                perangkat.classList.remove("text-green-500");
                perangkat.classList.remove("text-red-500");
                perangkat.classList.add(
                  item.status == "1" ? "border-green-500" : "border-red-500"
                );
                perangkat.classList.add(
                  item.status == "1" ? "text-green-500" : "text-red-500"
                );

                if (item.status != "1") {
                  stoppedDeviceId.push(item.gsId);
                }
              }
            });

            window.lines.forEach((item) => {
              item.color = "#22c55e";
            });

            stoppedDeviceId.forEach((i) => {
              const data_lines_stopped = window.data_line.map((item, index) =>
                item.from == i || item.to == i ? index : null
              );

              data_lines_stopped.forEach((item) => {
                if (item != null) {
                  window.lines[item].color = "#ef4444";
                }
              });
            });
          },
          showDetail(e) {
            if (
              e.currentTarget.parentElement.parentElement.parentElement.classList.contains(
                "main-component"
              )
            ) {
              return null;
            }
            this.modalOpen = true;
            this.perangkat.oldId = e.currentTarget.getAttribute("gs-id");
            this.perangkat.id = e.currentTarget.getAttribute("gs-id");
            this.perangkat.nama = e.currentTarget.innerText;
            this.perangkat.status = e.currentTarget.getAttribute("gs-status");
            this.perangkat.flow = e.currentTarget.getAttribute("gs-flow");
            this.perangkat.temperatur =
              e.currentTarget.getAttribute("gs-temperatur");
          },
          async saveDetail(e) {
            e.preventDefault();

            await new Promise((res) => {
              const device = document.querySelector(
                `[gs-id="${this.perangkat.oldId}"]`
              );
              device.children[1].innerHTML = this.perangkat.nama;
              device.setAttribute("gs-id", this.perangkat.id);

              setTimeout(async () => {
                await this.save();
                res(true);
              }, 200);
            });

            this.modalOpen = false;
          },
          notif(message, success = true) {
            this.notifikasi.message = message;
            this.notifikasi.success = success;
            this.notifikasi.show = true;
            setTimeout(() => {
              this.notifikasi.show = false;
            }, 3000);
          },
          beforeLink(e) {
            const target = e.currentTarget;
            const component = document.querySelector("#before-link-component");

            if (window.lineTargetBefore == target) {
              this.notif("target penghubung tidak valid", false);
            } else {
              if (window.lineBefore) {
                this.deleteLastLine();

                makeLine({
                  from: window.lineTargetBefore.getAttribute("gs-id"),
                  to: target.getAttribute("gs-id"),
                });

                window.lineBefore = null;
                window.lineTargetBefore = null;

                this.mode = "move";
              } else {
                window.lineTargetBefore = target;
                window.lineBefore = new LeaderLine(target, component, {
                  size: 2.5,
                  color: "gold",
                });
              }
            }
          },
          deleteLastLine() {
            const lines = document.querySelectorAll(".leader-line");
            const lastLine = lines[lines.length - 1];
            lastLine.remove();
          },
        }));
      });

      async function init() {
        const res = await axios.get("./api/skema.php");

        window.data_grid = GridStack.init({
          float: true,
          acceptWidgets: true,
          removable: "#trash",
          disableResize: true,
        });

        window.data_grid.load(res.data.data.grid);

        window.data_grid.on("added change", function () {
          document
            .querySelectorAll(".main-component .drag-component")
            .forEach((item) => {
              item.removeAttribute("x-on:click");
              item.removeAttribute("gs-id");
            });

          window.lines.forEach((item) => {
            item.position();
          });
        });

        res.data.data.line.forEach((item) => {
          makeLine(item);
        });
      }

      document.addEventListener("DOMContentLoaded", init);

      function makeLine({ from, to }) {
        line = new LeaderLine(
          document.querySelector(`[gs-id='${from}']`),
          document.querySelector(`[gs-id='${to}']`),
          {
            color: "#6b7280",
            size: 2.5,
          }
        );

        window.data_line.push({ id: line._id, from, to });
        window.lines.push(line);

        window.lines.forEach((item, index) => {
          const el = document.querySelectorAll(".leader-line")[index];

          if (el) {
            el.setAttribute("l-id", item._id);
            el.children[1].addEventListener("click", () => {
              const lId = el.getAttribute("l-id");

              window.lines = window.lines.filter((item) => {
                if (item._id != lId) {
                  return true;
                } else {
                  item.remove();
                  return false;
                }
              });
              window.data_line = window.data_line.filter(
                (item) => item.id != lId
              );

              el.remove();
            });
          }
        });
      }

      setTimeout(() => {
        GridStack.setupDragIn(".node-component", {
          appendTo: "body",
          helper: (event) => {
            const id = Date.now();
            let target = event.target.parentElement;

            if (target.classList.contains("grid-stack-item-content")) {
              target = target.children[0];
            }

            target.setAttribute("gs-id", id);
            target.setAttribute(
              "x-on:click",
              "mode == `move` ? showDetail : beforeLink"
            );
            target.removeAttribute("x-bind:class");

            target.children[0].removeAttribute("x-bind:src");
            target.children[0].removeAttribute("x-bind:alt");
            target.children[1].removeAttribute("x-html");

            // const data = {
            //   id: id,
            //   nama: target.children[1].innerText,
            // };

            const clone = target.cloneNode(true);

            return clone;
          },
        });
      }, 400);

      document.addEventListener("mousemove", (e) => {
        const component = document.querySelector("#before-link-component");

        component.style.top = e.y + "px";
        component.style.left = e.x + "px";

        if (window.lineBefore) {
          window.lineBefore.position();
        }
      });