export default function PoliFlexTurboSamplePage() {
  const standardColors = [
    { code: "4901", name: "White", swatch: "#f5f5f5" },
    { code: "4991", name: "Black", swatch: "#1f1f1f" },
    { code: "4951", name: "Light Grey", swatch: "#cfcfcf" },
    { code: "4980", name: "Anthracite", swatch: "#4a4a4a" },
    { code: "4919", name: "Lemon Yellow", swatch: "#f4e04d" },
    { code: "4934", name: "Bright Yellow", swatch: "#f0c400" },
    { code: "4955", name: "Red", swatch: "#c62828" },
    { code: "4982", name: "Royal Blue", swatch: "#1e4fd1" },
    { code: "4965", name: "Navy", swatch: "#1f2f5a" },
    { code: "4977", name: "Mint", swatch: "#98e2d0" },
    { code: "4933", name: "Bright Lime", swatch: "#84cc16" },
    { code: "4914", name: "Purple", swatch: "#7c3aed" },
  ];

  const effectColors = [
    {
      code: "4920",
      name: "Gold Metallic",
      swatch: "linear-gradient(135deg, #c69214, #f4d06f)",
    },
    {
      code: "4930",
      name: "Silver Metallic",
      swatch: "linear-gradient(135deg, #8d99ae, #edf2f4)",
    },
    {
      code: "4922",
      name: "Rose Gold",
      swatch: "linear-gradient(135deg, #b76e79, #f7cac9)",
    },
    {
      code: "4924",
      name: "Bright Copper",
      swatch: "linear-gradient(135deg, #b87333, #e6b89c)",
    },
  ];

  const neonColors = [
    { code: "4940", name: "Neon Yellow", swatch: "#f6ff00" },
    { code: "4941", name: "Neon Green", swatch: "#39ff14" },
    { code: "4942", name: "Neon Orange", swatch: "#ff6a00" },
    { code: "4943", name: "Neon Pink", swatch: "#ff2bd6" },
  ];

  const ColorCard = ({ color }) => (
    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="mb-3 h-20 w-full rounded-xl border border-zinc-200"
        style={{ background: color.swatch }}
      />
      <div className="text-sm font-semibold text-zinc-900">{color.name}</div>
      <div className="text-xs text-zinc-500">Art.-Nr. {color.code}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:px-12">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              Flexfolie • Schnellpressung • Premium PU
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              POLI-FLEX® TURBO
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
              Die leistungsstarke Textiltransferfolie für besonders kurze
              Presszeiten, niedrige Verarbeitungstemperaturen und saubere
              Ergebnisse auf Baumwolle, Polyester und Mischgeweben.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["3–5 Sek.", "Presszeit"],
                ["ab 130 °C", "Temperatur"],
                ["60 °C", "waschbeständig"],
                ["matt", "Oberfläche"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-zinc-100 p-4">
                  <div className="text-lg font-bold">{value}</div>
                  <div className="text-sm text-zinc-600">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
                Farben ansehen
              </button>
              <button className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100">
                Datenblatt anfordern
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <div className="mb-4 aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-6 text-white">
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-300">
                  Produktbild
                </div>
                <div className="mt-8 text-3xl font-bold">Turbo</div>
                <div className="mt-2 max-w-[14rem] text-sm text-zinc-200">
                  Premium Flexfolie für effiziente Produktion und starke
                  Haftung.
                </div>
              </div>
              <div className="text-sm text-zinc-500">
                Musterdarstellung für eure Produktseite
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
                <div className="text-sm font-semibold text-zinc-900">
                  Vorteile
                </div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  <li>• Kurze Presszeit für hohe Produktivität</li>
                  <li>• Niedrige Temperatur für empfindliche Textilien</li>
                  <li>• Sehr gute Entgittereigenschaften</li>
                  <li>• Angenehm weicher Griff</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
                <div className="text-sm font-semibold text-zinc-900">
                  Geeignet für
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {[
                    "T-Shirts",
                    "Sporttextilien",
                    "Workwear",
                    "Baumwolle",
                    "Polyester",
                    "Mischgewebe",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Farbauswahl
            </h2>
            <p className="mt-2 text-zinc-600">
              Übersichtlich gegliedert in Standard-, Effekt- und Neonfarben.
            </p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm text-zinc-500 ring-1 ring-zinc-200">
            Musteransicht
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Standardfarben</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {standardColors.map((color) => (
                <ColorCard key={color.code} color={color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Metallic & Effektfarben
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {effectColors.map((color) => (
                <ColorCard key={color.code} color={color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Neonfarben</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {neonColors.map((color) => (
                <ColorCard key={color.code} color={color} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Technische Informationen
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Material", "PU-Transferfolie"],
              ["Oberfläche", "Matt"],
              ["Transfer", "Warm abziehbar"],
              ["Pflege", "Waschbar bis 60 °C"],
              ["Verarbeitung", "Plotten & entgittern"],
              ["Einsatz", "Textilien & Veredelung"],
              ["Verpressung", "Kurz & energiesparend"],
              ["Besonderheit", "Hohe Elastizität"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200"
              >
                <div className="text-sm text-zinc-500">{label}</div>
                <div className="mt-1 font-semibold text-zinc-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">
        <div className="rounded-[2rem] bg-zinc-900 px-8 py-10 text-white shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sauber präsentiert. Schnell verstanden. Direkt verkaufsstark.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Diese Musterseite ist bewusst moderner aufgebaut als eine klassische
            Artikelliste: mit starkem Einstieg, klaren Vorteilen, technischer
            Übersicht und einer Farbdarstellung, die deutlich hochwertiger
            wirkt.
          </p>
        </div>
      </section>
    </div>
  );
}
