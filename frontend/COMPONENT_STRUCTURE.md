# ClarityAI Frontend Component Structure

## 📁 Directory Structure

```
frontend/
├── components/
│   ├── layout/           # Layout components
│   │   ├── Layout.jsx    # Main layout wrapper with animations
│   │   ├── Navbar.jsx    # Navigation with progress line
│   │   └── index.js      # Layout exports
│   ├── sections/         # Page sections
│   │   ├── HeroSection.jsx      # Hero section with video
│   │   ├── FeaturesSection.jsx  # Features and content sections
│   │   └── index.js      # Section exports
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx  # Complete home page
│   │   └── index.js      # Page exports
│   ├── ui/               # Reusable UI components
│   │   ├── Button.jsx    # Button component with variants
│   │   ├── Card.jsx      # Card component
│   │   └── index.js      # UI exports
│   └── [existing components] # BreathingExercise, SoundTherapy, etc.
├── pages/
│   ├── index.jsx         # Home page (now uses HomePage component)
│   └── [other pages]     # Chat, Journal, etc.
└── lib/                  # Utilities and configurations
```

## 🧩 Component Architecture

### Layout Components
- **Layout.jsx**: Main wrapper that handles GSAP animations and global layout
- **Navbar.jsx**: Navigation with centered logo and scroll progress line

### Section Components
- **HeroSection.jsx**: Hero section with video background and CTA
- **FeaturesSection.jsx**: All content sections below hero

### UI Components
- **Button.jsx**: Reusable button with variants (primary, secondary, ghost)
- **Card.jsx**: Reusable card component with hover effects

### Page Components
- **HomePage.jsx**: Complete home page composition

## 🎯 Benefits of This Structure

### ✅ Scalability
- **Modular components**: Easy to add new sections or pages
- **Reusable UI**: Button and Card components can be used anywhere
- **Clear separation**: Layout, sections, and UI are clearly separated

### ✅ Maintainability
- **Single responsibility**: Each component has one clear purpose
- **Easy updates**: Change button styles in one place, affects everywhere
- **Clean imports**: Organized exports make imports clean

### ✅ Reusability
- **UI components**: Button and Card can be used across all pages
- **Layout components**: Navbar can be used on other pages
- **Section components**: Sections can be reused or rearranged

## 🚀 Usage Examples

### Using UI Components
```jsx
import { Button, Card } from '../components/ui';

// Primary button
<Button href="/chat">Start Chat</Button>

// Secondary button
<Button variant="secondary" onClick={handleClick}>Cancel</Button>

// Card with hover
<Card hover padding="lg">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Creating New Pages
```jsx
import { Layout, Navbar } from '../components/layout';
import { Button } from '../components/ui';

export default function NewPage() {
  return (
    <Layout>
      <Navbar />
      <main>
        <Button href="/">Go Home</Button>
      </main>
    </Layout>
  );
}
```

### Adding New Sections
```jsx
// Create new section component
export default function NewSection() {
  return (
    <section className="section">
      <Card>
        <h2>New Section</h2>
        <Button>Action</Button>
      </Card>
    </section>
  );
}

// Add to page
<FeaturesSection />
<NewSection />
```

## 🔧 Future Enhancements

1. **Theme System**: Add theme provider for consistent colors
2. **Animation Library**: Centralize animation configurations
3. **Form Components**: Add Input, Textarea, etc.
4. **Modal System**: Add modal and overlay components
5. **Loading States**: Add loading and skeleton components

This structure makes the frontend highly scalable and maintainable! 🎉

