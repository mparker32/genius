# GENIUS Act Rulemakings Tracker

A comprehensive web tracker for monitoring the implementation of the GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins Act) rulemakings and regulatory requirements.

## Overview

This tracker monitors 23 different rulemaking requirements across multiple federal agencies, tracking:
- Overall implementation progress
- Individual rulemaking deadlines
- Agency-specific requirements
- Implementation timelines
- Regulatory status updates

## Project Structure

```
genius-implementation/
├── index.html      # Main HTML structure
├── styles.css      # All styling
├── data.js         # Rulemaking data and constants
├── app.js          # Application logic
└── README.md       # This file
```

## Features

### Overall Progress Tracking
- Days since enactment (July 18, 2025)
- Days to main deadline (1 year mark)
- Days to implementation (18 months)
- Rules past deadline counter

### Filtering & Sorting
- Filter by agency
- Filter by status (Not Started, In Progress, Overdue)
- Sort by section number, agency, deadline, or progress
- Full-text search across requirements

### Interactive Cards
- Click any rulemaking card to expand details
- Individual progress tracking for each rulemaking
- Timeline information for deadlines and implementation
- Placeholder for Paradigm commentary (ready for updates)

### Responsive Design
- Mobile-friendly layout
- Clean, minimalist Paradigm-branded design
- Monospace font for technical aesthetic

## Key Dates

- **Enactment Date**: July 18, 2025
- **Main Deadline**: July 18, 2026 (1 year after enactment)
- **Implementation Date**: January 18, 2027 (18 months after enactment)

## Deployment

### Option 1: Local Deployment
Simply open `index.html` in any modern web browser. No server required.

### Option 2: Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages

### Option 3: Web Server
Place all files in your web server's public directory:
```bash
# Example with nginx
cp -r * /var/www/html/genius-tracker/
```

## Updating Data

### Adding Paradigm Commentary
Edit `data.js` and add commentary to any rulemaking:

```javascript
{
    "section": "3(d)",
    "paradigmCommentary": "Your commentary here",
    "paradigmAttitude": "supportive" // or "neutral", "concerned", "critical"
}
```

### Adding New Rulemakings
Add new entries to the `rulemakingsData` array in `data.js`:

```javascript
{
    "section": "X(y)",
    "requirement": "Description of requirement",
    "agency": "Responsible agency",
    "deadline": "Deadline description",
    "implementation": "Implementation timeline",
    "notes": "Additional notes",
    "deadlineDate": "YYYY-MM-DD",
    "paradigmCommentary": "",
    "paradigmAttitude": ""
}
```

### Updating Status
The tracker automatically calculates status based on:
- Current date vs. deadline date
- Progress percentage (time elapsed)

To manually track actual regulatory progress, you could extend the data structure to include:
```javascript
"actualStatus": "published" // or "proposed", "pending", "delayed"
```

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit `styles.css` to change the color scheme:
- Primary color: `#00ff41` (Paradigm green)
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- Borders: `#e5e5e5` (light gray)

### Fonts
Currently uses system fonts. To add custom fonts, update the `font-family` in `styles.css`.

## Future Enhancements

Potential features to add:
- Real-time status updates via API
- Federal Register integration
- Email notifications for deadline reminders
- Export to PDF/CSV
- Historical tracking of rule changes
- Public comment period tracking
- RSS feed for updates

## License

Customize based on your needs.

## Contact

For questions about the GENIUS Act tracker, visit [Paradigm](https://www.paradigm.xyz).
