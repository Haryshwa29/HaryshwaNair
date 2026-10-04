import type { ProjectFlow } from './flows';

// Shared coordinates keep branch lanes readable at the same scale as the flagship diagrams.
const node = (id: string, x: number, y: number, title: string, detail: string, kind = 'process') => ({ id, x, y, title, detail, kind });
const edge = (path: string, label = '', x = 0, y = 0) => ({ path, label, x, y });
export const additionalFlows: Record<string, ProjectFlow> = {
  sentinelscope: {
    title: 'From a chat message to reputation evidence',
    intro: 'The command and phrase handlers converge on one URL scan path. Telegram carries the request; VirusTotal supplies the reputation data.', height: 1000,
    nodes: [
      node('command', 35, 30, '/scan_url command', 'Telegram message + user ID'),
      node('phrase', 665, 30, 'Scan / check phrase', 'Text handler → same scan function'),
      node('limit', 350, 165, 'Within user rate limit?', 'In-memory request allowance', 'decision'),
      node('reject', 35, 165, 'Ask the user to wait', 'Stop this request', 'terminal'),
      node('input', 350, 310, 'Normalize and validate URL', 'Basic format, not a safety verdict', 'decision'),
      node('invalid', 35, 310, 'Explain invalid input', 'Request a usable URL', 'terminal'),
      node('submit', 350, 455, 'Submit to VirusTotal', 'API v3 URL submission'),
      node('report', 350, 600, 'Retrieve reputation report', 'Read available detection statistics'),
      node('external', 665, 600, 'External service boundary', 'Availability, quota, report readiness', 'store'),
      node('reply', 350, 745, 'Format the Telegram reply', 'Reputation signals for human review'),
      node('log', 350, 890, 'Activity record', 'Local audit log', 'store'),
    ],
    edges: [edge('M165 100 V130 H480 V165'), edge('M795 100 V130 H480'), edge('M350 200 H295','No',322,187), edge('M480 235 V310','Yes',505,275), edge('M350 345 H295','Invalid',320,332), edge('M480 380 V455','Valid',510,422), edge('M480 525 V600'), edge('M665 635 H610'), edge('M480 670 V745'), edge('M480 815 V890')],
    notes: ['Both entry points use the same scan handler; inline queries are not a separate working scan engine.', 'The per-user rate limit is stored in memory. Restarting the process loses that state, and multiple instances would need a shared limit store.', 'URL submission and report retrieval cross into VirusTotal. A report may be unavailable or incomplete; error handling and synchronous requests remain hardening work.', 'A low detection count is not a guarantee of safety. The reply supports a triage decision, while local activity records can contain submitted URLs and user identifiers.'],
  },
  'financial-rag': {
    title: 'Index once, retrieve through two complementary paths',
    intro: 'The ingestion lane prepares filing context. At question time, semantic and keyword rankings converge before the application selects an answer path.', height: 1130,
    nodes: [node('filing',350,25,'SEC filing','Document text and filing metadata'), node('chunks',350,155,'Clean, section and chunk','Preserve context for retrieval'), node('vectors',35,295,'OpenAI → ChromaDB','Embeddings and vector index','store'),node('keywords',665,295,'BM25 keyword index','Exact terms and token matches','store'),node('question',350,435,'Question from Streamlit','Search both prepared indexes'),node('fusion',350,575,'Fuse ranked candidates','Combine and select source context'),node('route',350,715,'Choose answer route','Question-based routing','decision'),node('direct',35,855,'Direct generation','Answer using retrieved passages'),node('agent',665,855,'Specialist analysis','Financial, compliance or risk route'),node('answer',350,1000,'Answer with references','Inspect retrieved source passages','terminal')],
    edges:[edge('M480 95 V155'),edge('M480 225 V260 H165 V295'),edge('M480 260 H795 V295'),edge('M165 365 V470 H350'),edge('M795 365 V470 H610'),edge('M480 505 V575'),edge('M480 645 V715'),edge('M350 750 H165 V855','General',218,736),edge('M610 750 H795 V855','Specialist',745,736),edge('M165 925 V1035 H350'),edge('M795 925 V1035 H610')],
    notes:['Document processing removes noise, identifies sections and creates chunks with metadata before retrieval.', 'Semantic retrieval can match related concepts; BM25 can retain exact phrases and financial terms. Rank fusion combines candidates instead of treating raw scores as interchangeable.', 'The question router chooses between direct generation and a specialist path. The diagram represents alternatives, not sequential calls to every specialist.', 'References make answers reviewable against the filing. Retrieval can still omit context and generation can still misinterpret it; the original document remains the authority.'],
  },
  medai: {
    title: 'From practice material to structured feedback',
    intro: 'Upload and transcription prepare the input; the evaluation route then transforms a stored transcript into an inspectable educational result.', height:1000,
    nodes:[node('audio',35,25,'Audio practice material','Upload and transcription path'),node('text',665,25,'Transcript text','Text input path'),node('s3',350,170,'Transcript stored in S3','Evaluation API reads text','store'),node('extract',350,315,'Extract and segment','Presentation sections + information'),node('tree',350,460,'Generate reasoning tree','Intermediate reasoning artifact'),node('rubric',350,605,'Apply evaluation rubric','Scores and improvement suggestions'),node('json',350,750,'Assemble structured result','Sections, tree and evaluation'),node('mongo',35,895,'MongoDB persistence','Save evaluation for retrieval','store'),node('ui',665,895,'Return to the application','Review feedback with the transcript','terminal')],
    edges:[edge('M165 95 V130 H480 V170'),edge('M795 95 V130 H480'),edge('M480 240 V315'),edge('M480 385 V460'),edge('M480 530 V605'),edge('M480 675 V750'),edge('M480 820 V850 H165 V895'),edge('M480 850 H795 V895')],
    notes:['Audio preparation is separate from evaluation. The evaluation route begins with transcript text loaded from S3.', 'Extraction organizes the presentation so subsequent feedback can refer to sections rather than one undifferentiated text block.', 'The reasoning tree and rubric output are intermediate and final model artifacts. Their structure supports inspection; it does not prove that the reasoning or score is valid.', 'Completed results are persisted to MongoDB and returned to the application. My contribution was the rubrics and AI evaluation logic within the wider team system.'],
  },
};
