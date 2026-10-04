export type FlowNode = {id:string;x:number;y:number;title:string;detail:string;kind:string};
export type FlowEdge = {path:string;label:string;x:number;y:number};
export type ProjectFlow = {title:string;intro:string;height:number;nodes:FlowNode[];edges:FlowEdge[];notes:string[]};
export const flows: Record<string, ProjectFlow> = {
  "arbiter-ai": {
    "title": "How an event becomes a verdict",
    "intro": "Follow the branches: immediate escalation, deterministic decisions, or a contextual model review. All completed decisions converge on the audit trail.",
    "height": 1020,
    "nodes": [
      {
        "id": "event",
        "x": 350,
        "y": 30,
        "title": "Normalized event",
        "detail": "Host, source, signature, message",
        "kind": "process"
      },
      {
        "id": "rail",
        "x": 350,
        "y": 155,
        "title": "Guardrail hit?",
        "detail": "Check non-suppressible patterns",
        "kind": "decision"
      },
      {
        "id": "fact",
        "x": 665,
        "y": 155,
        "title": "Matching curated fact?",
        "detail": "Exact host + dangerous marker",
        "kind": "decision"
      },
      {
        "id": "pre",
        "x": 350,
        "y": 295,
        "title": "Pre-filter decision",
        "detail": "Score and deterministic rules",
        "kind": "decision"
      },
      {
        "id": "direct",
        "x": 35,
        "y": 295,
        "title": "Clear verdict",
        "detail": "Escalate or suppress",
        "kind": "process"
      },
      {
        "id": "context",
        "x": 350,
        "y": 435,
        "title": "Gather scoped context",
        "detail": "SQLite history + facts + criticality",
        "kind": "store"
      },
      {
        "id": "model",
        "x": 350,
        "y": 565,
        "title": "Local model inference",
        "detail": "Ollama proposes a verdict",
        "kind": "process"
      },
      {
        "id": "check",
        "x": 350,
        "y": 705,
        "title": "Validate suppression",
        "detail": "Confidence ≥ 0.7 + guardrail veto",
        "kind": "decision"
      },
      {
        "id": "escalate",
        "x": 665,
        "y": 835,
        "title": "Escalate",
        "detail": "Human review required",
        "kind": "terminal"
      },
      {
        "id": "audit",
        "x": 350,
        "y": 945,
        "title": "Record verdict + audit",
        "detail": "SQLite memory + JSONL shadow flag",
        "kind": "store"
      }
    ],
    "edges": [
      {
        "path": "M480 100 V155",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M610 190 H665",
        "label": "Yes",
        "x": 635,
        "y": 175
      },
      {
        "path": "M480 225 V295",
        "label": "No",
        "x": 503,
        "y": 265
      },
      {
        "path": "M795 225 V265 H930 V870 H925",
        "label": "No fact",
        "x": 898,
        "y": 405
      },
      {
        "path": "M795 155 V125 H640 V470 H610",
        "label": "Matching fact → context",
        "x": 757,
        "y": 115
      },
      {
        "path": "M350 330 H295",
        "label": "Clear",
        "x": 321,
        "y": 316
      },
      {
        "path": "M165 365 H20 V980 H350",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M480 365 V435",
        "label": "Ambiguous",
        "x": 528,
        "y": 407
      },
      {
        "path": "M480 505 V565",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M480 635 V705",
        "label": "Model result",
        "x": 532,
        "y": 674
      },
      {
        "path": "M610 600 H650 V870 H665",
        "label": "Failure",
        "x": 686,
        "y": 650
      },
      {
        "path": "M610 740 H795 V835",
        "label": "Low confidence / veto",
        "x": 777,
        "y": 729
      },
      {
        "path": "M480 775 V945",
        "label": "Accepted verdict",
        "x": 538,
        "y": 893
      },
      {
        "path": "M795 905 V980 H610",
        "label": "",
        "x": 0,
        "y": 0
      }
    ],
    "notes": [
      "An unexcepted guardrail hit escalates before inference. A corroborating administrator fact can route that specific hit to model review; it never grants suppression by itself.",
      "A clear pre-filter verdict skips the model. Ambiguous events receive signature history, asset criticality, and scope-checked facts.",
      "Model failure, a suppression confidence below 0.7, or an applicable post-model guardrail veto leads to escalation. The matching-fact exception is retained in the rationale.",
      "Completed verdicts update memory and append a JSONL record. Shadow mode is enabled by default; this diagram does not imply an autonomous response action."
    ]
  },
  "trustkit-ai": {
    "title": "Two entry paths, different processing flows",
    "intro": "Live Copilot and uploaded deep scans share analysis modules, but orchestrate them differently. The two lanes preserve those differences.",
    "height": 1010,
    "nodes": [
      {
        "id": "live",
        "x": 90,
        "y": 40,
        "title": "Live Copilot",
        "detail": "React → WebSocket /ws/live",
        "kind": "process"
      },
      {
        "id": "upload",
        "x": 570,
        "y": 40,
        "title": "Uploaded tour",
        "detail": "React → POST /deep-scan",
        "kind": "process"
      },
      {
        "id": "liveframe",
        "x": 90,
        "y": 180,
        "title": "Receive JPEG frame",
        "detail": "Listing claims from session config",
        "kind": "process"
      },
      {
        "id": "sample",
        "x": 570,
        "y": 180,
        "title": "Save & sample video",
        "detail": "Temporary file → limited key frames",
        "kind": "process"
      },
      {
        "id": "parallel",
        "x": 90,
        "y": 320,
        "title": "Analyze concurrently",
        "detail": "OpenCV quality + Gemini vision",
        "kind": "process"
      },
      {
        "id": "sequential",
        "x": 570,
        "y": 320,
        "title": "Analyze each frame",
        "detail": "Quality then vision; repeat for frames",
        "kind": "process"
      },
      {
        "id": "reasonlive",
        "x": 90,
        "y": 460,
        "title": "Merge + reason",
        "detail": "Current observations + listing claims",
        "kind": "process"
      },
      {
        "id": "reasonupload",
        "x": 570,
        "y": 460,
        "title": "First-frame assessment",
        "detail": "First quality + vision result + claims",
        "kind": "process"
      },
      {
        "id": "livereply",
        "x": 90,
        "y": 600,
        "title": "Send alert JSON",
        "detail": "Optional warning audio",
        "kind": "process"
      },
      {
        "id": "listing",
        "x": 570,
        "y": 600,
        "title": "Address supplied?",
        "detail": "Optional listing/photo comparison",
        "kind": "decision"
      },
      {
        "id": "loop",
        "x": 90,
        "y": 740,
        "title": "Continue session",
        "detail": "Next frame or contextual chat",
        "kind": "process"
      },
      {
        "id": "report",
        "x": 570,
        "y": 740,
        "title": "Assemble report",
        "detail": "Arrays + assessment + optional audio",
        "kind": "process"
      },
      {
        "id": "fallback",
        "x": 90,
        "y": 880,
        "title": "Per-frame failure",
        "detail": "Fallback alert; keep session alive",
        "kind": "terminal"
      },
      {
        "id": "cleanup",
        "x": 570,
        "y": 880,
        "title": "Return & clean up",
        "detail": "Optional comparison; delete temp file",
        "kind": "terminal"
      }
    ],
    "edges": [
      {
        "path": "M220 110 V180",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M700 110 V180",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M220 250 V320",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M700 250 V320",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M220 390 V460",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M700 390 V460",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M220 530 V600",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M700 530 V600",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M220 670 V740",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M700 670 V740",
        "label": "No address",
        "x": 775,
        "y": 711
      },
      {
        "path": "M220 810 H50 V215 H90",
        "label": "Next frame",
        "x": 45,
        "y": 552
      },
      {
        "path": "M90 355 H20 V915 H90",
        "label": "Error",
        "x": 43,
        "y": 863
      },
      {
        "path": "M350 915 H405 V215 H350",
        "label": "Continue",
        "x": 404,
        "y": 564
      },
      {
        "path": "M700 810 V880",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M830 635 H930 V775 H830",
        "label": "Compare if address",
        "x": 859,
        "y": 694
      }
    ],
    "notes": [
      "Listing claims can be enriched through a listing scrape when an address is provided. Live frame analysis runs the quality and vision modules concurrently.",
      "Uploaded video is sampled; quality and vision run sequentially for each extracted frame. The combined trust assessment currently uses the first frame’s observations.",
      "With an address, deep scan attempts a separate comparison using the first three tour frames and listing photos/details. Failure produces a comparison error entry.",
      "Vision mock fallback and live per-frame fallback paths exist. Assessments are investigation signals, not proof of fraud. Temporary upload cleanup runs in a finally block."
    ]
  },
  "ssh-honeypot": {
    "title": "The lifecycle of an SSH session",
    "intro": "The manager owns the connection and evidence. A per-session container handles shell execution, while the command loop maintains the working directory.",
    "height": 1030,
    "nodes": [
      {
        "id": "client",
        "x": 350,
        "y": 30,
        "title": "Incoming SSH connection",
        "detail": "Create directory + metadata",
        "kind": "process"
      },
      {
        "id": "transport",
        "x": 350,
        "y": 165,
        "title": "Paramiko transport",
        "detail": "Host key, auth events, shell channel",
        "kind": "process"
      },
      {
        "id": "container",
        "x": 350,
        "y": 300,
        "title": "Container starts?",
        "detail": "Limits + tmpfs + no-new-privileges",
        "kind": "decision"
      },
      {
        "id": "failure",
        "x": 665,
        "y": 300,
        "title": "Startup failure",
        "detail": "Log error; close channel/transport",
        "kind": "terminal"
      },
      {
        "id": "read",
        "x": 350,
        "y": 445,
        "title": "Read command",
        "detail": "Append command event + input text",
        "kind": "decision"
      },
      {
        "id": "exit",
        "x": 35,
        "y": 445,
        "title": "Exit / EOF",
        "detail": "End interaction",
        "kind": "process"
      },
      {
        "id": "cd",
        "x": 665,
        "y": 445,
        "title": "cd or blank command",
        "detail": "Update cwd or redraw prompt",
        "kind": "process"
      },
      {
        "id": "exec",
        "x": 350,
        "y": 590,
        "title": "docker exec",
        "detail": "Run command at tracked cwd",
        "kind": "process"
      },
      {
        "id": "results",
        "x": 350,
        "y": 730,
        "title": "Record & reply",
        "detail": "Exit code, duration, stdout/stderr",
        "kind": "process"
      },
      {
        "id": "cleanup",
        "x": 35,
        "y": 870,
        "title": "Session cleanup",
        "detail": "Stop container; close transport",
        "kind": "terminal"
      },
      {
        "id": "files",
        "x": 665,
        "y": 870,
        "title": "Session evidence",
        "detail": "metadata / JSONL / transcript",
        "kind": "store"
      }
    ],
    "edges": [
      {
        "path": "M480 100 V165",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M480 235 V300",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M610 335 H665",
        "label": "No",
        "x": 637,
        "y": 320
      },
      {
        "path": "M480 370 V445",
        "label": "Yes",
        "x": 502,
        "y": 410
      },
      {
        "path": "M350 480 H295",
        "label": "Exit",
        "x": 322,
        "y": 465
      },
      {
        "path": "M610 480 H665",
        "label": "cd / blank",
        "x": 640,
        "y": 465
      },
      {
        "path": "M480 515 V590",
        "label": "Other command",
        "x": 548,
        "y": 558
      },
      {
        "path": "M480 660 V730",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M350 765 H320 V550 H400 V515",
        "label": "Next prompt",
        "x": 319,
        "y": 646
      },
      {
        "path": "M795 515 H930 V410 H480 V445",
        "label": "Continue",
        "x": 816,
        "y": 397
      },
      {
        "path": "M165 515 V870",
        "label": "",
        "x": 0,
        "y": 0
      },
      {
        "path": "M350 625 H310 V835 H165 V870",
        "label": "Loop error → cleanup",
        "x": 186,
        "y": 821
      },
      {
        "path": "M295 905 H665",
        "label": "Persist end timestamp",
        "x": 480,
        "y": 892
      },
      {
        "path": "M610 765 H795 V870",
        "label": "Command result events",
        "x": 794,
        "y": 829
      }
    ],
    "notes": [
      "The manager creates metadata and records authentication attempts. Failed transport startup or a missing channel logs an error and closes the transport.",
      "A writable container uses memory, PID and CPU limits, no-new-privileges, and tmpfs mounts. Network isolation only applies when a network is explicitly configured.",
      "Exit/logout/quit or end-of-input ends the loop. Blank input redraws the prompt. The manager tracks cd state; ordinary commands execute inside the container.",
      "Command result events record exit code, duration, and output lengths; stdout/stderr return to the SSH client. Session cleanup stops the container, closes transport, and updates metadata."
    ]
  }
};
