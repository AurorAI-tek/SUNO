const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const MetaTag = require('../models/MetaTag');
const Feature = require('../models/Feature');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample data
const initialMetaTags = [
  {
    name: 'Verse',
    description: 'Used to specify lyrics for verse sections of the song',
    syntax: '[Verse] your verse lyrics here',
    examples: [
      {
        prompt: '[Verse] Walking down the street, with sunshine on my face',
        description: 'Simple verse example for a happy, upbeat song'
      }
    ],
    category: 'Structure'
  },
  {
    name: 'Chorus',
    description: 'Used to specify lyrics for chorus sections of the song',
    syntax: '[Chorus] your chorus lyrics here',
    examples: [
      {
        prompt: '[Chorus] Never giving up, never falling down',
        description: 'Motivational chorus example with repetitive pattern'
      }
    ],
    category: 'Structure'
  },
  {
    name: 'Bridge',
    description: 'Used to specify lyrics for bridge sections, typically contrasting with verse and chorus',
    syntax: '[Bridge] your bridge lyrics here',
    examples: [
      {
        prompt: '[Bridge] And then I realized, everything has changed',
        description: 'Reflective bridge with emotional shift'
      }
    ],
    category: 'Structure'
  },
  {
    name: 'Instrumental',
    description: 'Creates an instrumental section with no vocals',
    syntax: '[Instrumental]',
    examples: [
      {
        prompt: '[Instrumental] A dreamy guitar solo that builds to a climax',
        description: 'Instrumental section with descriptive guidance'
      }
    ],
    category: 'Instrumental'
  },
  {
    name: 'Mood',
    description: 'Sets the emotional tone of the song or section',
    syntax: '[Mood: type]',
    examples: [
      {
        prompt: '[Mood: melancholic] I remember our days by the ocean',
        description: 'Using mood to create a sad, nostalgic feeling'
      },
      {
        prompt: '[Mood: euphoric] Tonight we\'re alive and nothing can stop us',
        description: 'Creating an energetic, positive atmosphere'
      }
    ],
    category: 'Mood'
  },
  {
    name: 'Genre',
    description: 'Specifies a musical genre for the song or section',
    syntax: '[Genre: type]',
    examples: [
      {
        prompt: '[Genre: jazz] Smooth saxophone notes float through the city night',
        description: 'Setting a jazz style for the entire prompt'
      },
      {
        prompt: '[Verse][Genre: rock] Breaking through the walls that hold me back',
        description: 'Applying rock genre specifically to the verse'
      }
    ],
    category: 'Genre'
  },
  {
    name: 'Vocals',
    description: 'Specifies vocal style or characteristics',
    syntax: '[Vocals: type]',
    examples: [
      {
        prompt: '[Vocals: female alto] The mountains call to me',
        description: 'Specifying a female alto voice'
      },
      {
        prompt: '[Vocals: whispered] I have a secret to tell you',
        description: 'Creating a whispered vocal effect'
      }
    ],
    category: 'Vocals'
  },
  {
    name: 'Tempo',
    description: 'Controls the speed or pace of the song',
    syntax: '[Tempo: speed]',
    examples: [
      {
        prompt: '[Tempo: fast] Running through the night, heart pounding',
        description: 'Creating a fast-paced, energetic song'
      },
      {
        prompt: '[Tempo: slow] Gentle waves washing over the shore',
        description: 'Setting a slow, relaxed tempo'
      }
    ],
    category: 'Other'
  }
];

const initialFeatures = [
  {
    title: 'Custom Mode',
    description: 'Custom Mode gives you more control over the music generation process by allowing you to specify detailed parameters.',
    howToUse: 'Access Custom Mode from the main Suno interface and use the advanced controls to adjust aspects like structure, instrumentation, and vocal characteristics.',
    examples: [
      {
        prompt: '[Verse] Walking through the forest [Chorus] Birds singing in harmony [Genre: folk] [Tempo: medium] [Vocals: male baritone]',
        description: 'A folk song using custom structure tags and specific vocal type'
      }
    ],
    imageUrl: '',
    order: 1
  },
  {
    title: 'Song Extension',
    description: 'The Song Extension feature allows you to continue or extend an existing Suno-generated track with additional sections.',
    howToUse: 'After generating an initial song, select the "Extend" option and provide additional prompt details for the next section.',
    examples: [
      {
        prompt: 'Extend with [Bridge] The stars align, showing us the way [Instrumental] Dreamy synth solo that fades into the final chorus',
        description: 'Adding a bridge and instrumental section to an existing song'
      }
    ],
    imageUrl: '',
    order: 2
  },
  {
    title: 'Audio Upload for Reinterpretation',
    description: 'This feature allows you to upload an audio sample which Suno will analyze and reinterpret in a new style.',
    howToUse: 'Upload your audio file, then provide a prompt describing how you want Suno to reinterpret or transform the audio.',
    examples: [
      {
        prompt: 'Reinterpret this piano melody as a full orchestral piece with dramatic strings and brass',
        description: 'Transforming a simple piano recording into an orchestral arrangement'
      }
    ],
    imageUrl: '',
    order: 3
  }
];

// Import function
const importData = async () => {
  try {
    // Clean existing data
    await MetaTag.deleteMany();
    await Feature.deleteMany();
    await User.deleteMany();

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('T6$za6/VWAl&~2S', salt);
    
    await User.create({
      username: 'gogberg46',
      password: hashedPassword,
      isAdmin: true
    });
    
    // Insert new data
    await MetaTag.insertMany(initialMetaTags);
    await Feature.insertMany(initialFeatures);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Main execution
if (process.argv[2] === '-d') {
  // Delete all data
  const deleteData = async () => {
    try {
      await MetaTag.deleteMany();
      await Feature.deleteMany();
      // Don't delete users automatically
      
      console.log('Data Destroyed!');
      process.exit();
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  };
  
  deleteData();
} else {
  importData();
}
