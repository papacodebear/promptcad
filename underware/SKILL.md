---
name: underware-stl-generator
description: Generate 3D-printable STL files for the Underware 2.0 cable management and organization system from a natural-language description of the part.
---

# Underware STL Generator

Generate 3D-printable STL files for the Underware 2.0 cable management and organization system by describing what you need in natural language. The skill maps your description to OpenSCAD parameters and builds a render URL — open it in a browser to preview the part in 3D and download the STL.

## Trigger phrases

"generate underware", "make underware", "underware STL", "cable channel STL", "underware item holder", "underware hook", "cable loop holder", "underware connector", "underware base", "underware top", "underware accessories", "underware organizer"

---

## System Overview

Underware is a parametric OpenSCAD cable management and organization system built on a 25mm grid (Multiboard / openGrid compatible). Two families of parts:

**Channels** — cable routing tubes with a removable top. Mount to a surface via their base.  
**Accessories** — holders, hooks, and connectors that mount directly to Multiboard/openGrid slots.

The agent's job is to map natural language → parameters → a render URL. Rendering itself happens client-side, in the browser, via OpenSCAD WASM.

**Render site:** `https://promptcad.papacodebear.workers.dev`  
**Source repo:** `https://github.com/AndyLevesque/QuackWorks/tree/main/Underware`  
**License:** CC-BY-NC-SA 4.0 (non-commercial)

---

## Step 1 — Identify the part type

### Channels

All channels are two-part snap systems: a **Base** (mounts to surface) and a **Top** (snaps on, removable for wire access). Use `Base_Top_or_Both` to choose which part(s) to render.

| User says… | Channel | SCAD file |
|---|---|---|
| "straight", "I channel", "run of cable", "length of channel" | **I (Straight)** | `Underware_I_Channel.scad` |
| "90 degree corner", "L shaped", "right angle turn" | **L (Corner)** | `Underware_L_Channel.scad` |
| "T junction", "three way", "tee" | **T (Junction)** | `Underware_T_Channel.scad` |
| "cross", "X junction", "four way", "intersection" | **X (Cross)** | `Underware_X_Channel.scad` |
| "branch split", "offset branch", "angled branch off to side" | **Branch Split** | `Underware_Branch_Split_Channel.scad` |
| "Y split", "Y junction", "splits into two" | **Y** | `Underware_Y_Channel.scad` |
| "S curve", "gentle diagonal", "offset straight" | **S (Diagonal)** | `Underware_S_Channel.scad` |
| "diagonal with a turn at end", "diagonal corner" | **Diagonal** | `Underware_Diagonal_Channel.scad` |
| "curve", "arc", "curved corner", "C channel" | **C (Curved)** | `Underware_C_Channel.scad` |
| "mitre", "miter", "45 degree corner" | **Mitre** | `Underware_Mitre_Channel.scad` |
| "height change", "ramp", "goes up", "elevation change" | **Height Change** | `Underware_Height_Change_Channel.scad` |
| "changes width AND height", "different size on each end" | **Transition** | `Underware_Transition_Channel.scad` |

### Accessories

Single-piece parts that mount to Multiboard/openGrid slots.

| User says… | Accessory | SCAD file |
|---|---|---|
| "basket", "shelf", "open tray", "item holder", "bin" | **Item Holder** | `Underware_Item_Holder.scad` |
| "clamshell", "enclosed holder", "grabs item on both sides" | **Clamshell Holder** | `Underware_Item_Holder_Clamshell_Style.scad` |
| "hook", "wall hook", "hanging hook" | **Hook** | `Underware_Hooks.scad` |
| "cable loop", "loop holder", "cord wrap", "cylindrical holder" | **Cable Loop Holder** | `Underware_Cable_Loop_holder.scad` |
| "keyhole", "keyhole mount", "snap keyhole" | **Keyholes** | `Underware_keyholes.scad` |
| "snap connector", "threaded connector" | **Connector** | `Underware_Connectors.scad` |

If type is ambiguous, ask.

---

## Step 2 — Extract parameters

### Universal channel parameters

| Parameter | Variable | Values | Default | NL cues |
|---|---|---|---|---|
| Which part | `Base_Top_or_Both` | `"Base"` `"Top"` `"Both"` | `"Both"` | "just the base", "top only", "complete set" |
| Width | `Channel_Width_in_Units` | integer 1–4 | `1` | "1 unit", "50mm wide" → 2, "single" → 1 |
| Internal height | `Channel_Internal_Height` | 12–72 in steps of 6 | `12` | "thick cables" → 18–24, "just USB" → 12 |
| Mounting method | `Mounting_Method` | `"Threaded Snap Connector"` `"Direct Multiboard Screw"` `"Magnet"` `"Wood Screw"` `"Flat"` | `"Threaded Snap Connector"` | "snap", "screw", "magnets", "wood screw", "no mount" |
| Profile | `Profile_Type` | `"Original"` `"v2.5"` | `"Original"` | "v2.5", "inverse clip" |

**Width in mm → units:** `units = ceil(mm / 25)`

### Channel-specific parameters

**I (Straight):**
- `Channel_Length_Units` — integer, default 5
- `Number_of_Cord_Cutouts` — integer 0–10, default 0. "3 exit holes"
- `Cord_Side_Cutouts` — `"Both Sides"` `"Left"` `"Right"` `"Top"`, default `"Both Sides"`
- `Cord_Cutout_Width` — float mm, default 12
- `Distance_Between_Cutouts` — float mm, default 25
- `Shift_Cutouts_Forward_or_Back` — float mm, default 0
- `Add_Label` — boolean, default false
- `Text` — string, only when Add_Label=true
- `Text_size` — float, default 10

**L (Corner):**
- `L_Channel_Length_in_Units_X_Axis` — integer, default 1
- `L_Channel_Length_in_Units_Y_Axis` — integer, default 1

**T (Junction):**
- `Corner_Style` — `"Sharp"` or `"Round"`, default `"Sharp"`

**X (Cross):**
- `Channel_X_Width_X_in_Units` — integer, default 1
- `Channel_Y_Width_in_Units` — integer, default 1

**Y (Y-Split):**
- `Y_Units_Over` — integer 1–10, default 1
- `Y_Units_Up` — integer 1–10, default 1
- `Y_Output_Direction` — `"Forward"` or `"Turn"`, default `"Forward"`
- `Y_Straight_Distance` — float 12.5–100, default 12.5

**S (Diagonal offset, no turn):**
- `Units_Over` — integer, default 2
- `Units_Up` — integer, default 2

**Diagonal (diagonal with optional 90° turn):**
- `Units_Over` — integer, default 2
- `Units_Up` — integer, default 2
- `Output_Direction` — `"Forward"` or `"Turn"`, default `"Turn"`
- `Straight_Distance` — float 12.5–100, default 25

**C (Curved arc):**
- `Curve_Radius_in_Units` — integer, default 2

**Mitre:**
- `Length_of_Longest_Edge_1` — float mm, default 75
- `Length_of_Longest_Edge_2` — float mm, default 75

**Height Change:**
- `Channel_Internal_Height_1` — mm, default 18
- `Channel_Internal_Height_2` — mm, default 12
- `Channel_Length_Units` — integer, default 3
- `Rise_Distance` — mm, default 25

**Transition:**
- `Channel_Width_in_Units_1` — integer, default 2
- `Channel_Width_in_Units_2` — integer, default 1
- `Channel_Internal_Height_1` — mm, default 18
- `Channel_Internal_Height_2` — mm, default 12
- `Channel_Length_Units` — integer, default 3
- `Rise_Distance` — mm, default 25
- `Rise_Offset` — mm, default 0

### Accessory parameters

**Item Holder** (`Underware_Item_Holder.scad`):
- `Mounting_Style` — `"Multiconnect"` or `"Threaded Snap"`, default `"Multiconnect"`
- `Mounting_Surface` — `"Multiboard"` or `"openGrid"`, default `"Multiboard"`
- `Internal_Depth` — float mm, default 50.0
- `Internal_Width` — float mm, default 60.0
- `Internal_Height` — float mm, default 15.0
- `frontCutout` — boolean, default true
- `bottomCutout` — boolean, default false
- `cordCutout` — boolean, default false
- `cordCutoutDiameter` — float mm, default 10
- `rightCutout` / `leftCutout` — boolean, default false
- `wallThickness` — float mm, default 2
- `baseThickness` — float mm, default 3
- `edgeRounding` — float mm, default 0.5
- `ClamShell_Mode` — boolean, default false

**Clamshell Holder** (`Underware_Item_Holder_Clamshell_Style.scad`):
- Same as Item Holder; additionally:
- `total_item_width` — float mm, default 150
- `item_slop` — float mm, default 0.3
- `Minimum_Safe_Mount_Clearance_From_Edge` — float mm, default 13

**Hooks** (`Underware_Hooks.scad`):
- `Connection_Type` — `"Multipoint"` `"Multiconnect"` `"Threaded Snap"`, default `"Multiconnect"`
- `Depth` — float mm, default 25.0
- `Width` — float mm, default 25.0
- `Height` — float mm, default 20.0
- `hookHeight` — float mm, default 10
- `hookRound` — float mm, default 1
- `nbSecondaryHooks` — integer, default 0
- `secondaryHookHeight` — float mm, default 5
- `onSided` — boolean, default true
- `wallThickness` — float mm, default 2

**Cable Loop Holder** (`Underware_Cable_Loop_holder.scad`):
- `Connection_Type` — `"Multipoint"` or `"Multiconnect"`, default `"Multiconnect"`
- `holderHeight` — float mm, default 45
- `postDiameter` — float mm, default 20
- `holderDiameter` — float mm, default 40
- `extraHoldingEdgeLength` — float mm, default 14

**Keyholes** (`Underware_keyholes.scad`):
- `Mounting_Surface` — `"Multiboard"` `"openGrid - Lite"` `"openGrid - Full"`, default `"Multiboard"`
- `Show_Part` — `"Snap Keyhole"` or `"Keyhole Test"`, default `"Snap Keyhole"` — **known bug: `"Snap Keyhole"` crashes the current renderer build. Use `"Keyhole Test"` (a fit-check jig, not the final mount) and tell the user real keyhole rendering is temporarily broken.**
- `Snap_Connector_Height` — float mm, default 3
- `distanceBetweenKeyholeEntranceCenters` — float mm, default 144
- `keyholeEntraceDiameter` — float mm, default 7.5
- `keyholeSlotDiameter` — float mm, default 4.1

**Connectors** (`Underware_Connectors.scad`):
- `Show_Part` — `"Snap Connector"` or `"Bolts"`, default `"Snap Connector"` — **known bug: `"Snap Connector"` crashes the current renderer build. Use `"Bolts"` until fixed.**
- `Bolt_Selection` — `"All"` `"Small MB Screw"` `"Small MB Screw split"` `"Small MB T Screw"` `"Small MB T Screw tool"`, default `"Small MB T Screw"`

**Mounting method sub-parameters** (channels only):

| Method | Extra params |
|---|---|
| `"Magnet"` | `Magnet_Diameter` (4.0), `Magnet_Thickness` (1.5), `Magnet_Tolerance` (0.1) |
| `"Wood Screw"` | `Wood_Screw_Thread_Diameter` (3.5), `Wood_Screw_Head_Diameter` (7), `Wood_Screw_Head_Height` (1.75) |

**Fit/strength tuning (only if user asks):**
- `Flex_Compensation_Scaling` — default 0.99. "tighter fit" → 0.98, "looser" → 1.0
- `Additional_Holding_Strength` — default 0.0, range 0–1.5

---

## Step 3 — Confirm before generating

Summarize what you understood and confirm with the user before building the URL. For multi-part runs, list all pieces.

> I'll render a **2-unit I-Channel**, 24mm tall, 5 units long, snap connector, base + top. Sound right?

---

## Step 4 — Build the render URL

Construct a JSON array of items. Each item has three fields:

```json
[
  {
    "component": "Underware_I_Channel.scad",
    "params": {
      "Channel_Width_in_Units": 2,
      "Channel_Internal_Height": 24,
      "Channel_Length_Units": 5,
      "Mounting_Method": "Threaded Snap Connector",
      "Base_Top_or_Both": "Both"
    },
    "label": "2U I-Channel"
  }
]
```

Rules:
- `component` — exact SCAD filename from the list above
- `params` — only include params that differ from defaults, or that directly affect geometry
- `label` — short human-readable name shown in the sidebar (auto-generated from filename if omitted)
- String param values must be strings in JSON; numbers must be numbers; booleans must be booleans

URL-encode the JSON and append to the site base URL as the hash fragment:

```
https://promptcad.papacodebear.workers.dev/#<url-encoded JSON>
```

Example final URL for a single item:

```
https://promptcad.papacodebear.workers.dev/#%5B%7B%22component%22%3A%22Underware_I_Channel.scad%22%2C%22params%22%3A%7B%22Channel_Width_in_Units%22%3A2%2C%22Channel_Internal_Height%22%3A24%2C%22Channel_Length_Units%22%3A5%2C%22Mounting_Method%22%3A%22Threaded+Snap+Connector%22%2C%22Base_Top_or_Both%22%3A%22Both%22%7D%2C%22label%22%3A%222U+I-Channel%22%7D%5D
```

Give this URL to the user. If you have browser access, feel free to open it yourself to confirm it renders.

---

## Multi-part cable runs

Pass all parts as a single JSON array — one URL renders and shows them all in a sidebar.

```json
[
  {
    "component": "Underware_I_Channel.scad",
    "params": { "Channel_Length_Units": 3, "Mounting_Method": "Threaded Snap Connector" },
    "label": "3U Straight"
  },
  {
    "component": "Underware_L_Channel.scad",
    "params": { "Mounting_Method": "Threaded Snap Connector" },
    "label": "L Corner"
  },
  {
    "component": "Underware_I_Channel.scad",
    "params": { "Channel_Length_Units": 2, "Mounting_Method": "Threaded Snap Connector" },
    "label": "2U Straight"
  }
]
```

---

## Print tips

- **Channel base:** Support-free, clip side up. PETG or PLA.
- **Channel top:** Print flat, no supports.
- **Item holders / hooks:** Print with back face down, no supports needed.
- **Snap connectors / keyholes:** Print upright for strongest threads.
- **Profile v2.5:** Clips from below — useful when top access is restricted.

---

## Example interactions

**"I need a straight channel 3 units long, 24mm tall, snap connector, base only"**

```json
[{"component":"Underware_I_Channel.scad","params":{"Channel_Length_Units":3,"Channel_Internal_Height":24,"Mounting_Method":"Threaded Snap Connector","Base_Top_or_Both":"Base"},"label":"3U Straight – Base"}]
```

**"Make me a hook to hold a headset, about 40mm wide and 30mm deep, Multiconnect"**

```json
[{"component":"Underware_Hooks.scad","params":{"Connection_Type":"Multiconnect","Width":40,"Depth":30},"label":"Headset Hook"}]
```

**"A basket for a small power brick, roughly 80×60×30mm, open front, on Multiboard"**

```json
[{"component":"Underware_Item_Holder.scad","params":{"Internal_Width":80,"Internal_Depth":60,"Internal_Height":30,"frontCutout":true,"Mounting_Style":"Multiconnect","Mounting_Surface":"Multiboard"},"label":"Power Brick Holder"}]
```

**"Channel that goes from 2 units wide down to 1, 18mm to 12mm tall, 3 units long"**

```json
[{"component":"Underware_Transition_Channel.scad","params":{"Channel_Width_in_Units_1":2,"Channel_Width_in_Units_2":1,"Channel_Internal_Height_1":18,"Channel_Internal_Height_2":12,"Channel_Length_Units":3},"label":"Transition 2U→1U"}]
```

---

*Underware 2.0 by Hands on Katie & BlackjackDuck (Andy Levesque). CC-BY-NC-SA 4.0. Non-commercial use only.*