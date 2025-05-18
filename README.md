# Devin Soup - Barber Shop Website

A modern, responsive website for Devin Soup's barber shop, built with React and Supabase.

## Features

- Online booking system
- Real-time updates using Supabase
- Responsive design
- Dark mode support
- Contact form with email notifications
- Interactive map integration

## Tech Stack

- React
- Supabase (Database, Authentication, Real-time)
- EmailJS (Email notifications)
- Google Maps API
- Tailwind CSS

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/donghaxkim/devinsoup.git
cd devinsoup
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
- Create a new Supabase project
- Create the necessary tables (bookings, etc.)
- Add your Supabase configuration to `src/supabaseClient.js`

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_BARBER_EMAIL=barber.devv@gmail.com
```

5. Start the development server:
```bash
npm start
```

## Deployment

The application can be deployed to any static hosting service (Vercel, Netlify, etc.).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Devin Soup - [@barber.dev1n](https://www.instagram.com/barber.dev1n/)
