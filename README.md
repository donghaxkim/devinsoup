# DevinSoup Barber Shop

A modern web application for Devin Soup's barber shop, featuring online booking, real-time appointment management, and automated email notifications.

## Features

- Online booking system with real-time availability
- Barber dashboard for appointment management
- Email notifications for bookings and reminders
- Responsive design for all devices
- Google Maps integration for location
- Real-time updates using Firebase

## Tech Stack

- React.js
- Firebase (Authentication, Firestore, Functions)
- Tailwind CSS
- Nodemailer for email notifications
- Google Maps API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DevinSoupBarber.git
cd DevinSoupBarber
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication, Firestore, and Functions
   - Add your Firebase configuration to `src/firebase.js`
   - Set up Firebase Functions for email notifications

4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Maps API key and other necessary environment variables

5. Start the development server:
```bash
npm start
```

## Firebase Functions Setup

1. Navigate to the functions directory:
```bash
cd functions
```

2. Install dependencies:
```bash
npm install
```

3. Update the email configuration in `functions/index.js`:
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with your Gmail app password

4. Deploy Firebase Functions:
```bash
firebase deploy --only functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Devin Soup - [@barber.dev1n](https://www.instagram.com/barber.dev1n/)
