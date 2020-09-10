const Event = require('../models/Event');

module.exports = {
    async getEventById(req, res) {
        const { eventId } = req.params;
       try{
           const event = await Event.findById(eventId);

           if(event) {
               return res.json(event);
           }
       } catch (error) {
           return res.status(400).json({ message: 'Even ID does not exist' });
       }

   },

   async getAllEvents(req, res) {
       const { eventType } = req.params;
       const query = event ? { event } : {}

      try{
          const events = await Event.find(query);

          if(events) {
              return res.json(events);
          }
      } catch (error) {
          return res.status(400).json({ message: 'We do not have any events yet!' });
      }

  }
}
