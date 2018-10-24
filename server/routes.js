import examplesRouter from './api/controllers/examples/router';
import leadCandidateRouter from './api/controllers/lead_candidate/lead.router';

export default function routes(app) {
  app.use('/api/examples', examplesRouter);
  app.use('/api/lead_candidate', leadCandidateRouter);
}
