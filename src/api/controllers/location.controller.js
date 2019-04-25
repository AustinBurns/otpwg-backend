import got from 'got';

export class LocationController {
  constructor(model) {
    this.model = model;

    this.search = this.search.bind(this);
  }

  async search(req, res) {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      };
      const baseUrl = 'https://api.yelp.com/v3/businesses';
      const query = new URLSearchParams([
        ['term', req.query.term],
        ...((req.query.latitude &&
          req.query.longitude && [
            ['latitude', req.query.latitude],
            ['longitude', req.query.longitude],
          ]) ||
          []),
        ...((req.query.location && [['location', req.query.location]]) || []),
      ]).toString();
      const { body } = await got('search', {
        headers,
        baseUrl,
        query,
        json: true,
      });

      res.status(200).json({ items: body.businesses });
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: 'Server Error' });
    }
  }
}
