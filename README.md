# PromptCAD

*Based on the incredible [QuackWorks](https://github.com/AndyLevesque/QuackWorks) project by
Andy Levesque and [Underware](https://handsonkatie.com/underware-2-0-the-made-to-measure-collection/)
by Hands On Katie.*

Generate 3D-printable STL files from natural language. Describe a part, an AI agent maps it to
parameters and builds a URL, and a static site renders it in-browser (OpenSCAD compiled to
WebAssembly) for preview and download — no server, no upload, nothing installed.

Currently supports the [Underware 2.0](https://handsonkatie.com/underware-2-0-the-made-to-measure-collection/)
cable management and organization system: channels and Multiboard/openGrid-mounted accessories.

## How to use it

1. Download [`underware/SKILL.md`](underware/SKILL.md) and give it to your agent (Claude, ChatGPT,
   or anything with browser access).
2. Describe the part you want in plain language.
3. Open the URL the agent generates with OpenSCAD parameters, the part renders in 3D in your browser. Rotate it, then download the STL.

**Live site:** https://promptcad.papacodebear.workers.dev
**Browse everything it can render:** https://promptcad.papacodebear.workers.dev/examples.html

## Examples

| | Shape | Sample prompt |
|---|---|---|
| <img src="underware/examples/i-channel.png" width="140"> | I-Channel (Straight) | A 2-unit wide, 5-unit long straight cable channel, 24mm internal height, with a threaded snap connector mount. |
| <img src="underware/examples/l-channel.png" width="140"> | L-Channel (Corner) | A 90 degree corner channel, 2 units long on each leg, threaded snap connector mount. |
| <img src="underware/examples/t-channel.png" width="140"> | T-Channel (Junction) | A T junction channel with rounded corners, splitting a cable run three ways. |
| <img src="underware/examples/x-channel.png" width="140"> | X-Channel (Cross) | A four-way cross channel, 2 units wide in each direction. |
| <img src="underware/examples/branch-split-channel.png" width="140"> | Branch Split Channel | A 1-unit wide channel that branches off to the side at an angle. |
| <img src="underware/examples/y-channel.png" width="140"> | Y-Channel (Split) | A Y-shaped channel splitting into two paths, spreading 2 units over and 2 units up. |
| <img src="underware/examples/s-channel.png" width="140"> | S-Channel (Diagonal) | An S-curve channel offsetting a cable run 3 units sideways and 2 units up without turning. |
| <img src="underware/examples/diagonal-channel.png" width="140"> | Diagonal Channel | A diagonal channel offsetting 2 units over and 2 units up, then turning 90 degrees at the end. |
| <img src="underware/examples/c-channel.png" width="140"> | C-Channel (Curved) | A curved channel with a 3-unit radius for a smooth arc around a corner. |
| <img src="underware/examples/mitre-channel.png" width="140"> | Mitre Channel | A mitred 45 degree corner channel, 100mm on one edge and 60mm on the other. |
| <img src="underware/examples/height-change-channel.png" width="140"> | Height Change Channel | A channel that steps up from 12mm to 24mm internal height over a 4-unit run. |
| <img src="underware/examples/transition-channel.png" width="140"> | Transition Channel | A channel transitioning from 2 units wide down to 1, and 18mm down to 12mm tall, over 3 units. |
| <img src="underware/examples/item-holder.png" width="140"> | Item Holder | An open-front basket, 80 by 60 by 30mm inside, to hold a small power brick, using the Multiboard grid system. |
| <img src="underware/examples/clamshell-holder.png" width="140"> | Clamshell Holder | An enclosed clamshell holder that grips a 150mm wide item on both sides, mounted to the Multiboard grid system. |
| <img src="underware/examples/hook.png" width="140"> | Hook | A wall hook 40mm wide and 30mm deep for hanging a headset, Multiconnect mount. |
| <img src="underware/examples/cable-loop-holder.png" width="140"> | Cable Loop Holder | A post to wrap and store a coiled cable, 45mm diameter and 50mm tall, Multiconnect mount. |
| <img src="underware/examples/keyhole-test-jig.png" width="140"> | Keyhole Test Jig | A test jig to check the fit of a Multiboard keyhole mount before printing the real part. |
| <img src="underware/examples/bolt-connector.png" width="140"> | Bolt Connector | A bolt-mounted connector for attaching channels to a board, using a small MB screw. |

## Attribution

Underware 2.0 is designed by **Hands on Katie** and **BlackjackDuck (Andy Levesque)**, licensed
CC-BY-NC-SA 4.0 (non-commercial). PromptCAD renders the `.scad` source directly from its home in
Andy Levesque's [QuackWorks](https://github.com/AndyLevesque/QuackWorks/tree/main/Underware)
repository — this project doesn't redistribute or modify that design, it just gives it a
natural-language front end. See Underware's own documentation at
[handsonkatie.com](https://handsonkatie.com/underware-2-0-the-made-to-measure-collection/) for the
full system, non-commercial license terms, and print guides.

The in-browser renderer also bundles [BOSL2](https://github.com/BelfrySCAD/BOSL2), the OpenSCAD
library Underware is built on.
