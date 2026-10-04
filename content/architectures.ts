export type DiagramNode = { title: string; subtitle: string; detail: string; icon: string; path?: string };
export type DiagramStage = { label: string; nodes: DiagramNode[] };
export type Diagram = { title: string; note: string; animated: boolean; stages: DiagramStage[] };
export const architectures: Record<string, Diagram> = {
  "arbiter-ai": {
    "title": "Inside the triage engine",
    "note": "Branch labels show alternative routes. Playback highlights architectural stages, not a live security event.",
    "stages": [
      {
        "label": "01 / Receive",
        "nodes": [
          {
            "title": "Security event",
            "subtitle": "Host · source · message",
            "detail": "A normalized event enters the triage engine. The portfolio demo uses sample events, not a live host collector.",
            "icon": "input",
            "path": "arbiter/triage.py"
          }
        ]
      },
      {
        "label": "02 / Enforce the boundary",
        "nodes": [
          {
            "title": "Guardrail check",
            "subtitle": "Dangerous pattern → escalate",
            "detail": "An unmatched dangerous pattern escalates immediately. A narrowly scoped administrator fact can route a matching guardrail to model review; it cannot directly suppress the event.",
            "icon": "shield",
            "path": "arbiter/triage.py"
          },
          {
            "title": "Deterministic pre-filter",
            "subtitle": "Clear decision → audit",
            "detail": "Events without a guardrail escalation receive a deterministic pass. Clear decisions bypass the model; ambiguous decisions continue to local inference.",
            "icon": "branch",
            "path": "arbiter/triage.py"
          }
        ]
      },
      {
        "label": "03 / Review ambiguous events",
        "nodes": [
          {
            "title": "SQLite context",
            "subtitle": "History · facts · asset criticality",
            "detail": "The engine retrieves signature history, scoped environment facts, and host criticality to contextualize the current event. Facts are checked against the current host/source scope; mismatches are annotated before inference.",
            "icon": "database",
            "path": "arbiter/triage.py"
          },
          {
            "title": "Ollama inference",
            "subtitle": "Context → proposed verdict",
            "detail": "A local language model proposes a decision, rationale, confidence, and evidence. The model is one decision tier, not the final authority.",
            "icon": "model",
            "path": "arbiter/triage.py"
          }
        ]
      },
      {
        "label": "04 / Check the proposed decision",
        "nodes": [
          {
            "title": "Confidence & veto",
            "subtitle": "Low confidence or failure → escalate",
            "detail": "A suppression confidence below 0.7 escalates. Model errors escalate too. A post-model guardrail can veto suppression, with the documented matching-fact exception.",
            "icon": "shield",
            "path": "arbiter/triage.py"
          }
        ]
      },
      {
        "label": "05 / Preserve the record",
        "nodes": [
          {
            "title": "Verdict memory",
            "subtitle": "SQLite history",
            "detail": "The decision is recorded for future context. Guardrail exceptions remain visible in the rationale.",
            "icon": "database",
            "path": "arbiter/triage.py"
          },
          {
            "title": "Audit trail",
            "subtitle": "JSONL · shadow flag",
            "detail": "The event, verdict, rationale, and shadow-mode flag are written to the audit trail. Shadow mode defaults to on. The JSONL record includes event source, host, type, and message alongside the verdict.",
            "icon": "output",
            "path": "arbiter/triage.py"
          }
        ]
      }
    ],
    "animated": true
  },
  "trustkit-ai": {
    "title": "From tour footage to reviewable signals",
    "note": "The map distinguishes live and uploaded-video paths. The deep-scan assessment currently uses combined first-frame observations.",
    "stages": [
      {
        "label": "01 / Capture",
        "nodes": [
          {
            "title": "React interface",
            "subtitle": "Tour media + listing claims",
            "detail": "The interface supplies live JPEG frames or an uploaded tour, together with listing context.",
            "icon": "input",
            "path": "backend/main.py"
          }
        ]
      },
      {
        "label": "02 / Choose an entry path",
        "nodes": [
          {
            "title": "Live Copilot",
            "subtitle": "WebSocket /ws/live",
            "detail": "Live JPEG frames are received over a WebSocket and processed one frame at a time. Listing information can be enriched when scraping succeeds.",
            "icon": "branch",
            "path": "backend/main.py"
          },
          {
            "title": "Deep scan",
            "subtitle": "POST /deep-scan → sampled frames",
            "detail": "Uploaded media is temporarily saved and sampled through the frame extractor. Time-based sampling and limits bound processing.",
            "icon": "process",
            "path": "backend/routes/deep_scan.py"
          }
        ]
      },
      {
        "label": "03 / Extract two kinds of evidence",
        "nodes": [
          {
            "title": "Frame quality",
            "subtitle": "OpenCV · blur & brightness",
            "detail": "Laplacian variance and brightness measurements produce quality signals. These are not proof of image manipulation or fraud.",
            "icon": "scan",
            "path": "backend/modules/metadata_analyzer.py"
          },
          {
            "title": "Visual observations",
            "subtitle": "Gemini / Vertex AI",
            "detail": "The vision integration extracts scene observations. Mock fallback paths exist when configuration or inference is unavailable. Live quality and vision calls run concurrently; deep scan calls them sequentially.",
            "icon": "model",
            "path": "backend/modules/vision_analyzer.py"
          }
        ]
      },
      {
        "label": "04 / Compare with claims",
        "nodes": [
          {
            "title": "Team reasoning pipeline",
            "subtitle": "Observations + listing context",
            "detail": "The reasoner compares observations and listing claims. Deep scan returns analysis arrays but currently bases its combined assessment on the first frame.",
            "icon": "branch",
            "path": "backend/routes/deep_scan.py"
          }
        ]
      },
      {
        "label": "05 / Optional listing comparison",
        "nodes": [
          {
            "title": "Listing photographs",
            "subtitle": "Address → listing data + comparison",
            "detail": "For uploaded tours with an address, a separate comparison attempts to compare the first three extracted video frames with listing photographs and details. Errors become a comparison error result without replacing the main report.",
            "icon": "scan",
            "path": "backend/routes/deep_scan.py"
          }
        ]
      },
      {
        "label": "06 / Return for review",
        "nodes": [
          {
            "title": "Assessment & warning",
            "subtitle": "Report / live alert + optional audio",
            "detail": "The backend returns an assessment and may generate warning audio. Results are prompts for investigation, not validated fraud determinations. Deep scan returns per-frame quality and vision arrays, assessment, optional audio, and optional listing comparison, then deletes the temporary uploaded file.",
            "icon": "output",
            "path": "backend/main.py"
          }
        ]
      }
    ],
    "animated": true
  },
  "sentinelscope": {
    "title": "The journey of a URL check",
    "note": "External boundaries are explicit: Telegram transports messages and VirusTotal receives submitted URLs.",
    "stages": [
      {
        "label": "01 / Ask in chat",
        "nodes": [
          {
            "title": "Telegram message",
            "subtitle": "/scan_url or scan/check phrase",
            "detail": "Commands and simple scan/check phrases reach the URL handler. Inline queries only prepare a message and do not perform this scan.",
            "icon": "input",
            "path": "bot.py"
          }
        ]
      },
      {
        "label": "02 / Admit the request",
        "nodes": [
          {
            "title": "Identity & rate limit",
            "subtitle": "5 requests / 30-second window",
            "detail": "The handler identifies the user and applies an in-memory rolling request limit before scanning. Invalid or excessive requests return a chat response.",
            "icon": "shield",
            "path": "bot.py"
          },
          {
            "title": "Normalize & validate",
            "subtitle": "Scheme + URL structure",
            "detail": "Missing schemes are added and basic URL structure is checked. An API key must be configured before a lookup proceeds.",
            "icon": "process",
            "path": "bot.py"
          }
        ]
      },
      {
        "label": "03 / Record and submit",
        "nodes": [
          {
            "title": "Local activity log",
            "subtitle": "User + requested URL",
            "detail": "The scan request is recorded locally. This makes the data boundary important: logs may include user identifiers and submitted URLs.",
            "icon": "database",
            "path": "bot.py"
          },
          {
            "title": "VirusTotal submission",
            "subtitle": "POST /api/v3/urls",
            "detail": "The URL is sent to VirusTotal. A non-success response returns an error to the user.",
            "icon": "external",
            "path": "bot.py"
          }
        ]
      },
      {
        "label": "04 / Retrieve reputation",
        "nodes": [
          {
            "title": "Report lookup",
            "subtitle": "URL-safe ID → GET report",
            "detail": "The normalized URL is encoded to a URL-safe identifier and used to fetch the report. The code requests the report after submission rather than polling for a completed analysis.",
            "icon": "scan",
            "path": "bot.py"
          }
        ]
      },
      {
        "label": "05 / Explain the result",
        "nodes": [
          {
            "title": "Telegram response",
            "subtitle": "Malicious · suspicious · harmless · undetected",
            "detail": "Statistics are formatted into a chat response. No detections does not establish that a URL is safe.",
            "icon": "output",
            "path": "bot.py"
          }
        ]
      }
    ],
    "animated": true
  },
  "ssh-honeypot": {
    "title": "A session and its evidence",
    "note": "A lab architecture. Docker network isolation is a configuration requirement, not a default guarantee.",
    "stages": [
      {
        "label": "01 / Connect",
        "nodes": [
          {
            "title": "SSH client",
            "subtitle": "Connection & password attempt",
            "detail": "Paramiko negotiates the session and records authentication attempts.",
            "icon": "input",
            "path": "src/manager.py"
          }
        ]
      },
      {
        "label": "02 / Prepare",
        "nodes": [
          {
            "title": "Session manager",
            "subtitle": "Host key · channel · session directory",
            "detail": "The manager creates a directory for session evidence and accepts the shell channel.",
            "icon": "process",
            "path": "src/manager.py"
          },
          {
            "title": "Disposable container",
            "subtitle": "Resource limits · no-new-privileges",
            "detail": "A writable per-session container starts with --rm, memory, PID and CPU limits, no-new-privileges, and tmpfs mounts for /tmp and /run. A custom network is used only when explicitly configured. Startup failure is logged, reported to the client, and closes the connection.",
            "icon": "shield",
            "path": "src/manager.py"
          }
        ]
      },
      {
        "label": "03 / Interact",
        "nodes": [
          {
            "title": "Command loop",
            "subtitle": "Read → docker exec → reply",
            "detail": "Commands are read from the SSH channel, executed inside the container, and returned to the client as output.",
            "icon": "branch",
            "path": "src/manager.py"
          },
          {
            "title": "Shell state & command routing",
            "subtitle": "Exit · blank input · cd · command",
            "detail": "Exit/logout/quit end the session; blank lines redraw the prompt. The manager maintains cwd for cd, while other commands run through docker exec. Results record exit code, duration, and output lengths.",
            "icon": "branch",
            "path": "src/manager.py"
          }
        ]
      },
      {
        "label": "04 / Record and close",
        "nodes": [
          {
            "title": "Session artifacts",
            "subtitle": "metadata.json · session.jsonl · transcript.txt",
            "detail": "Connection context, structured events, and interaction text are preserved for inspection.",
            "icon": "database",
            "path": "src/manager.py"
          },
          {
            "title": "Cleanup",
            "subtitle": "Stop the session container",
            "detail": "The manager records session end and stops the container during cleanup.",
            "icon": "output",
            "path": "src/manager.py"
          }
        ]
      }
    ],
    "animated": true
  },
  "financial-rag": {
    "title": "Two indexes, one grounded context",
    "note": "A shared team system. Arrows explain data preparation and question answering, not a measured runtime trace.",
    "stages": [
      {
        "label": "01 / Prepare filings",
        "nodes": [
          {
            "title": "SEC document processor",
            "subtitle": "Clean HTML → sections → chunks",
            "detail": "The processor extracts document structure and metadata, with fallback chunking when sections are difficult to identify.",
            "icon": "input",
            "path": "document_processor.py"
          }
        ]
      },
      {
        "label": "02 / Build complementary indexes",
        "nodes": [
          {
            "title": "Semantic index",
            "subtitle": "OpenAI embeddings → ChromaDB",
            "detail": "Embeddings index chunks by semantic similarity. Query embeddings retrieve conceptually related passages.",
            "icon": "database",
            "path": "financial_rag.py"
          },
          {
            "title": "Keyword index",
            "subtitle": "BM25",
            "detail": "Tokenized chunks retain exact-term matches that semantic retrieval can overlook.",
            "icon": "database",
            "path": "financial_rag.py"
          }
        ]
      },
      {
        "label": "03 / Ask and retrieve",
        "nodes": [
          {
            "title": "User question",
            "subtitle": "Streamlit → hybrid retrieval",
            "detail": "A question searches both indexes. Rank contributions are combined and top passages become answer context.",
            "icon": "scan",
            "path": "financial_rag.py"
          }
        ]
      },
      {
        "label": "04 / Route the answer",
        "nodes": [
          {
            "title": "Direct generation",
            "subtitle": "Retrieved context → answer",
            "detail": "General questions follow the retrieval-and-generation path.",
            "icon": "model",
            "path": "financial_rag.py"
          },
          {
            "title": "Specialist agent",
            "subtitle": "Financial / compliance / risk",
            "detail": "The router can choose a specialist based on question keywords. Agents use retrieved context and their supported tools.",
            "icon": "branch",
            "path": "financial_rag.py"
          }
        ]
      },
      {
        "label": "05 / Inspect",
        "nodes": [
          {
            "title": "Answer & references",
            "subtitle": "Response + retrieved passages",
            "detail": "The interface exposes source passages and optional agent output so answers can be checked against filings.",
            "icon": "output",
            "path": "financial_rag.py"
          }
        ]
      }
    ],
    "animated": true
  },
  "medai": {
    "title": "A structured evaluation pipeline",
    "note": "This diagram follows the transcript evaluation path. It describes an educational prototype, not validated clinical decision-making.",
    "stages": [
      {
        "label": "01 / Supply practice material",
        "nodes": [
          {
            "title": "Transcript in S3",
            "subtitle": "Text input / transcription output",
            "detail": "The evaluation API loads transcript text from S3. Audio upload and transcription are separate supporting paths.",
            "icon": "input",
            "path": "Backend/models/evaluator_routes.py"
          }
        ]
      },
      {
        "label": "02 / Organize the presentation",
        "nodes": [
          {
            "title": "Extract & segment",
            "subtitle": "Patient information + sections",
            "detail": "The evaluator extracts structured information and segments the presentation into sections for subsequent analysis.",
            "icon": "process",
            "path": "Backend/models/evaluator.py"
          }
        ]
      },
      {
        "label": "03 / Evaluate",
        "nodes": [
          {
            "title": "Reasoning tree",
            "subtitle": "Structured diagnostic reasoning",
            "detail": "The model produces a decision-tree representation as an intermediate evaluation artifact.",
            "icon": "branch",
            "path": "Backend/models/evaluator.py"
          },
          {
            "title": "Rubric feedback",
            "subtitle": "Scoring + suggestions",
            "detail": "The evaluator generates scoring and feedback from the structured presentation. My contribution focused on rubrics and AI logic.",
            "icon": "model",
            "path": "Backend/models/evaluator.py"
          }
        ]
      },
      {
        "label": "04 / Return and preserve",
        "nodes": [
          {
            "title": "Structured JSON",
            "subtitle": "Sections · tree · evaluation",
            "detail": "The evaluator combines its stages into a structured result for the application.",
            "icon": "output",
            "path": "Backend/models/evaluator.py"
          },
          {
            "title": "MongoDB record",
            "subtitle": "Stored evaluation",
            "detail": "The API saves completed evaluation results for later retrieval.",
            "icon": "database",
            "path": "Backend/models/evaluator_routes.py"
          }
        ]
      }
    ],
    "animated": true
  }
};
