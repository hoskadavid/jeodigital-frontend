import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const IELTS = () => {
    
  useEffect(() => {
    // Hide navbar
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) {
      navbar.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }
    
    document.body.style.paddingTop = '0';
    
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
      document.body.style.paddingTop = '';
    };
  }, []);

  const [activeTab, setActiveTab] = useState('listening');
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [audioStates, setAudioStates] = useState({});
  const audioRefs = useRef({});

  // Comment state for each category
  const [comments, setComments] = useState({});
  const [commentFormData, setCommentFormData] = useState({
    name: '',
    email: '',
    website: '',
    comment: '',
    notifyFollowup: false,
    notifyPosts: false
  });
  const [submitting, setSubmitting] = useState(false);

  const openModal = (lessonData) => {
    setModalData(lessonData);
    setIsModalOpen(true);
    setExpandedSections({});
    setAudioStates({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setExpandedSections({});
    Object.keys(audioRefs.current).forEach(key => {
      if (audioRefs.current[key]) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
      }
    });
  };

  const toggleSection = (practiceId, section) => {
    const key = `${practiceId}-${section}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAudio = (practiceId) => {
    const audio = audioRefs.current[practiceId];
    if (audio) {
      if (audio.paused) {
        Object.keys(audioRefs.current).forEach(key => {
          if (key !== practiceId && audioRefs.current[key]) {
            audioRefs.current[key].pause();
            audioRefs.current[key].currentTime = 0;
            setAudioStates(prev => ({ ...prev, [key]: false }));
          }
        });
        audio.play();
        setAudioStates(prev => ({ ...prev, [practiceId]: true }));
      } else {
        audio.pause();
        setAudioStates(prev => ({ ...prev, [practiceId]: false }));
      }
    }
  };

  const handleAudioEnded = (practiceId) => {
    setAudioStates(prev => ({ ...prev, [practiceId]: false }));
  };

  const handleCommentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentFormData.name || !commentFormData.email || !commentFormData.comment) {
      alert('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    
    const newComment = {
      id: Date.now(),
      name: commentFormData.name,
      email: commentFormData.email,
      website: commentFormData.website,
      comment: commentFormData.comment,
      date: new Date().toLocaleString(),
      notifyFollowup: commentFormData.notifyFollowup,
      notifyPosts: commentFormData.notifyPosts
    };
    
    // Simulate API call
    setTimeout(() => {
      setComments(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newComment]
      }));
      
      // Reset form
      setCommentFormData({
        name: '',
        email: '',
        website: '',
        comment: '',
        notifyFollowup: false,
        notifyPosts: false
      });
      
      setSubmitting(false);
      alert('Comment posted successfully!');
    }, 500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = [
    { id: 'listening', title: 'Listening', icon: '🎧', color: 'from-blue-500 to-blue-600' },
    { id: 'reading', title: 'Reading', icon: '📖', color: 'from-green-500 to-green-600' },
    { id: 'writing', title: 'Writing', icon: '✍️', color: 'from-purple-500 to-purple-600' },
    { id: 'speaking', title: 'Speaking', icon: '🎙️', color: 'from-orange-500 to-orange-600' },
    { id: 'vocabulary', title: 'Vocabulary', icon: '📚', color: 'from-pink-500 to-pink-600' },
    { id: 'topics', title: 'Topics', icon: '📋', color: 'from-indigo-500 to-indigo-600' },
    { id: 'ontheday', title: 'On The Day Tips', icon: '📅', color: 'from-rose-500 to-rose-600' },
    { id: 'topresults', title: 'Top Results', icon: '🏆', color: 'from-yellow-500 to-yellow-600' },
    { id: 'advanced', title: 'Advanced IELTS', icon: '⭐', color: 'from-red-500 to-red-600' }
  ];

  // ========== MULTIPLE CHOICE CONTENT ==========
  const multipleChoiceContent = {
    title: 'IELTS Listening Multiple Choice Practice & Essential Tips',
    description: 'This lesson focuses on IELTS listening multiple choice questions and offers tips, practice and useful vocabulary to help you achieve your best.',
    tips: [
      'check for a title', 'find keywords in the question', 'paraphrase the keywords',
      'Read through the answer options', 'highlight similar options', 'note the differences',
      'All answer options will probably be mentioned in the recording – but only one will be the right answer.',
      'The questions come in order but the answer options will not come in order',
      'Don\'t think that the first answer you hear is the correct one – keep listening.',
      'You must develop speed reading skills to be able to read all answers and spot keywords'
    ],
    questionTypes: [
      { name: 'Answering a Question Three Options', description: 'Choose the correct answer to a question from three options' },
      { name: 'Finish the sentence', description: 'Complete a sentence by selecting the correct ending' },
      { name: 'Long List', description: 'Select multiple answers from a longer list of options' },
      { name: 'Picture Selection', description: 'Choose the correct picture based on the description' }
    ],
    practices: [
      {
        id: 1,
        title: 'Practice 1: Long List Selection',
        topic: 'Health Care Conference',
        question: 'Questions 1-3: Who will be lecturing at the conference today? Choose three options from the following list (A-G)',
        audioUrl: '/audio/health-care-conference.mp3',
        imageUrl: null,
        options: [
          'A = Dr Christopher Lord',
          'B = Dr David Bishop',
          'C = Dr George Ripley',
          'D = Dr William Benson',
          'E = Dr Roger Dean',
          'F = Dr Daisy Mandalay',
          'G = Dr Ralph Morris'
        ],
        transcript: `Today's topic under discussion is the health care system both past and present. We have a number of guests for today's lectures, videos and debates, one of them the notable Dr David Bishop.

The morning will be kicked off by Dr Roger Dean who will be presenting his speech summarising the major changes and challenges of the health care system from the year 2000 to around 2012. Following him, will be Dr William Benson who will oversee the debate on today's problems for hospitals. After lunch, Dr Daisy Mandalay will be showing a revealing video relating to the current trends in health problems faced by today's society. Dr Christopher Lord will then address everyone on the problems faced by family doctors and the vital role they play in the health care system. Last, but not least, Dr David Bishop, as I mentioned earlier, will take the floor to tell you about his current research. Dr Ralph Morris will be responsible for collecting your feedback on the various parts of the conference at the end of the day. That will conclude our seminars for the day. Tomorrow's conference details will be put up on the notice board later this afternoon but you will be all please to know that Dr George Ripley has agreed to lecture you all.`,
        answers: 'E, A, B (any order). Dr Roger Dean (E), Dr Christopher Lord (A), Dr David Bishop (B)',
        answerExplanation: 'The answer is not C (Dr George Ripley) because he is talking tomorrow not today. The answer is not D (Dr William Benson) because he is running a debate. The answer is not F (Dr Daisy Mandalay) because she is showing a video not talking. The answer is not G (Dr Ralph Morris) because he is collecting feedback and not speaking.'
      },
      {
        id: 2,
        title: 'Practice 2: Picture Selection',
        topic: 'Mammoths',
        question: 'Which type of mammoth is this lecture going to focus on? Choose the correct letter A-C',
        audioUrl: '/audio/mammoths.mp3',
        imageUrl: '/images/mammoth-types.png',
        transcript: `There is evidence of much change and development in the mammoth. We can see the Ambelodon 20 million years ago, the Stegodon 12 million years ago and finally the Stegotetrabelodon which existed somewhere between 7.5 to 4.5 million years ago. There seem to have been a number of changes in the physiology of the mammoth, the most prominent were in the height, the size of the ears and the shape of the head and tusks. Today, I'm going to be focusing, on the one most of us associate with the 'so-called' classic shape and size of a mammoth and which is most known for its huge curving tusks and colossal size.`,
        answer: 'B - The one with huge curving tusks and colossal size',
        vocabulary: 'mammoth = prehistoric animal now extinct similar in shape to an elephant, physiology = make-up / structure, prominent = major / outstanding, huge / colossal = enormous / extremely large'
      },
      {
        id: 3,
        title: 'Practice 3: Common IELTS MC Questions',
        topic: 'Dashford Study Center',
        audioUrl: '/audio/dashford-study-center.mp3',
        imageUrl: null,
        questions: [
          '1. Membership at the study center is 20 pounds: A. for everyone. B. for everyone except the elderly and students. C. for everyone each year.',
          '2. Members are able to take out: A. an unlimited amount of books. B. a maximum of 3 books. C. 3 books for 3 days.',
          '3. Booking is unnecessary for: A. the yoga, dance and gentle exercise classes. B. general fitness classes. C. the walking class.',
          '4. Arts and crafts classes are taught by: A. volunteers. B. teachers. C. teachers and volunteers.'
        ],
        transcript: `The study center in Dashford was opened to give free educational and recreational services to the community of Dashford. Membership is free for over 65's as well as for students, as long as they have a student ID. For everyone else it is an annual membership of 20 pounds.

Members are able to enjoy full access to our extensive library. The library comprises of a comprehensive collection of classic literature, resource books, children's books, history books and popular literature. As members, you are able to borrow up to 3 books at a time for up to 4 days.

Our recreational services extend for both members and non-members. We offer social and leisure activities for all age groups. Our yoga, dance and gentle exercise classes are extremely popular and booking ahead is required to ensure your place on one of these courses. However, our walking group, who meet once a week, offer unlimited places but you do have to have a good level of general fitness. We also have IT classes at beginner, intermediate and advanced levels. But for those of you who are more creative, there are arts and crafts classes which are run by a qualified teacher with volunteer support. Before checking everything why don't you take a look around and see what you might be interested in.`,
        answers: [
          '1. B - Membership is free for over 65\'s and students. For everyone else it is an annual membership of 20 pounds.',
          '2. B - Members are able to borrow up to 3 books at a time.',
          '3. C - The walking group offers unlimited places = no need to book.',
          '4. B - Arts and crafts classes are run by a qualified teacher.'
        ]
      }
    ]
  };

  // Diagram Questions Content
  const diagramQuestionsContent = {
    title: 'IELTS Listening Map & Diagram Techniques & Practice',
    description: 'Maps and diagrams frequently appear in the IELTS listening test. They can appear in any section, although it is more common to find them in Section 2. Below you will find useful tips and techniques to tackle map and diagram completion questions in IELTS listening with practice lessons to hone your skills.',
    
    tips: [
      'Maps can appear in any part of the listening test, although they appear more often in section 2.',
      'Maps are visual so there is a lot to look at in a short amount of time before the recording begins.',
      'First notice the title which tells you what the map is showing.',
      'Notice the number of buildings, facilities or rooms and their names and location.',
      'Maps will nearly always have rooms and buildings labelled to help you.',
      'Learn location language: beyond, next to, after that, further in, to the side, to the left, to the right, to the east, opposite, at the end of the road, by the gate etc.',
      'Check the location of the questions. The questions will come in order in the recording.',
      'Locate north. This is often helpful if it is given on the map.',
      'See if there are any arrows or if the map shows a logical path that the speaker might take.',
      'Always note how many words you need for the answers.',
      'As you move from question to question, follow the order of information in the recording.',
      'Most map recordings are similar to a guided tour which follows a logical order.',
      'Don\'t be distracted by extra information. Focus on listening for those answers.'
    ],
    
    locationLanguage: [
      'beyond', 'next to', 'after that', 'further in', 'to the side',
      'to the left', 'to the right', 'to the east', 'to the west', 'to the south', 'to the north',
      'opposite', 'at the end of the road', 'by the gate', 'directly in front of',
      'on the left hand side', 'straight ahead', 'past the', 'walking through',
      'to the left of this', 'to the right you can find'
    ],
    
    practices: [
      {
        id: 4,
        title: 'Map Practice 1: The Taj Mahal',
        topic: 'Historical Monument Tour',
        description: 'This exercise covers questions 1 – 7. There are two types of questions: sentence completion and map completion.',
        audioUrl: '/audio/taj-mahal.mp3',
        imageUrl: '/images/taj-mahal-map.png',
        questions: [
          'Questions 1-2: Complete the sentences below using no more than one word and/or a number.',
          '1. The Taj Mahal was completed in _________.',
          '2. Around _________ labourers were used in its creation.',
          'Questions 3-7: Label the map below using no more than two words and/or a number.',
          '3. Forecourt',
          '4. Great Gate',
          '5. Pond / Marble Pond',
          '6. Mausoleum',
          '7. Guesthouse / Guest House'
        ],
        transcript: `Welcome to the Taj Mahal. This is one of the most famous monuments to love in the world. It was built between 1631 and 1653 in the city of Agra by the Mughal Emperor Shah as a mausoleum for his wife. The construction involved some 20,000 workers and incorporated materials from China, Tibet, Sri Lanka and Arabia.

We are here at the Outer Gate and directly in front of us is the forecourt. On the left hand side of the forecourt, you will see some subsidiary tombs and opposite that are the tomb attendants' quarters. If you go straight ahead, you will come to the Great Gate and beyond that is the formal gardens. The gardens are divided into 4 sections by paths which represent the 4 rivers of paradise. Midway, where the paths intersect, is a marble pond, in which the mausoleum is beautifully reflected. Walking through the gardens, past the pond, you will come to the mausoleum itself which has a marble dome, 35m high. Each side of the building has archways which are framed by carefully chosen verses from the Qur'an in beautifully stylised calligraphy. To the left of this, is the mosque and to the right you can find a guesthouse. Now I'll give you some time to wander round and see this marvel for yourself.`,
        answers: [
          '1. 1653',
          '2. 20,000',
          '3. forecourt',
          '4. Great Gate',
          '5. marble pond',
          '6. mausoleum',
          '7. guesthouse'
        ],
        answerExplanation: 'The answers must be spelled correctly. "forecourt" (one word), "Great Gate" (capital letters not important), "marble pond" (two words), "mausoleum" (one word), "guesthouse" (one word or "guest house" two words).'
      },
      {
        id: 5,
        title: 'Map Practice 2: The Farm',
        topic: 'Organic Farm Tour',
        description: 'This lesson requires you to label places on the map. Always review locations and predict language before you start listening.',
        audioUrl: '/audio/farm-map.mp3',
        imageUrl: '/images/farm-map.png',
        questions: [
          'Questions 1 – 4: Complete the diagram using no more than two words.',
          '1. Northwest corner: _________ area',
          '2. East of parking area: _________ house',
          '3. North of barn: _________ pens',
          '4. South of barn: _________ storage'
        ],
        transcript: `As you drive up the driveway you will immediately arrive in the parking area. You will see to your left the farmhouse where the farmer lives as you drive up and directly to the left of the parking area is the main shed. There are a number of smaller sheds located around the main shed which are not currently labelled on the map. In the northwest corner of the farm is a pasture area which is a wide grassy expanse. It provides rich organic grass for our cows and, along with other types of feed, gives us our organic status and key selling point. From the parking area, you go east through the milk house, which is used daily, and then into the barn. This is where the cows are often sheltered. On the other side of the barn is the manure storage. To the north you will find the calf hutches which are located just beyond the maternity pens. Only 30% of our cows are used for breeding. In the bottom left corner of the barn is the loading chute. To the south are two circular areas, one of which is the feed storage and the other the deadstock area. We hope you will enjoy looking around our farm and learning about how we manage our cows.`,
        answers: [
          '1. pasture area',
          '2. milk house',
          '3. maternity pens',
          '4. feed storage'
        ],
        vocabulary: 'Keywords for maps: "to your left", "directly to the left of", "located around", "in the northwest corner", "from the parking area, you go east", "on the other side", "to the north you will find", "located just beyond", "in the bottom left corner", "to the south are two circular areas"',
        answerExplanation: 'The answers are: "pasture area" (northwest corner), "milk house" (east of parking area), "maternity pens" (north of barn, beyond calf hutches), "feed storage" (south of barn, circular area).'
      }
    ]
  };

  // Summary Completion Content
  const summaryCompletionContent = {
    title: 'IELTS Listening Summary Completion: Practice & Tips',
    description: 'IELTS listening summary completion essential tips and practice. These questions are quite common in the listening test and can appear in any section. You are required to listen and select the correct words or numbers to fill in the gaps.',
    
    tips: [
      'Task: You will be given a paragraph with missing words. Your task is to fill in the gaps with words or numbers from the recording to complete the paragraph.',
      'A Summary: The paragraph is a summary. This means you are not going to hear each sentence the same as in the recording. The information in the paragraph is summarised which means it focuses on key information rather than all details.',
      'Title: The summary completion questions will have a title. This will tell you what the paragraph focuses on.',
      'Answer Order: The answers will come in order in the recording. So, you will hear the answer to question 1 and after that the answer to question 2.',
      'Word Count: You will be told how many words or number you can have in your answer. Pay attention to this information.',
      'Similar: A summary completion contains the same questions as a Sentence Completion because you are completing sentence within the summary paragraph.',
      'Predict the type of answer from the sentence given: noun, verb etc.',
      'Grammar is important. The sentence must be grammatically correct when you complete it.',
      'Keywords in the question are critical to keeping your place and spotting the correct answer.',
      'Paraphrasing: Some of the words in the summary paragraph will be paraphrased and others will not. Be ready for synonyms and re-phrasing.',
      'Precise Words: Your answer must be the precise word from the recording. You can\'t alter the word.',
      'Spelling counts. Check your spelling because words incorrectly spelled are marked wrong.'
    ],
    
    practices: [
      {
        id: 6,
        title: 'Summary Completion - Exercise 1',
        topic: 'Buckingham Palace',
        description: 'Complete the summary about Buckingham Palace using words from the recording.',
        audioUrl: '/audio/buckingham-palace.mp3',
        imageUrl: '/images/buckingham-palace.jpg',
        questions: [
          'Complete the summary below using NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          '',
          'The ________ of Buckingham Palace is one of the most famous in the world.',
          'The first recorded Royal balcony appearance took place in ________.',
          'During the Second World War, Buckingham Palace suffered nine direct bomb ________.',
          'There are ________ rooms in the palace.',
          'There are ________ doors and 760 windows in Buckingham Palace.',
          'More than 50,000 people visit the Palace annually as The Queen\'s guests at banquets, lunches, dinners, receptions and ________ parties.'
        ],
        transcript: `Buckingham Palace is The Queen's official London residence. The balcony of Buckingham Palace is one of the most famous in the world. The first recorded Royal balcony appearance took place in 1851, when Queen Victoria stepped onto it during celebrations for the opening of the Great Exhibition. During the Second World War, Buckingham Palace suffered nine direct bomb hits.

Buckingham Palace has its own chapel, post office, swimming pool, staff cafeteria, doctor's surgery and cinema. There are 775 rooms in the palace. Some rooms at Buckingham Palace have a Chinese theme. There are 1,514 doors and 760 windows in Buckingham Palace. All windows are cleaned every six weeks. More than 50,000 people visit the Palace annually as The Queen's guests at banquets, lunches, dinners, receptions and garden parties.`,
        answers: [
          'balcony',
          '1851',
          'hits',
          '775',
          '1,514',
          'garden'
        ],
        answerExplanation: 'Adapted from royal.gov.uk. The answers must be spelled correctly. "balcony" - the famous balcony where the Royal Family appears. "1851" - the year of the first appearance. "hits" - bomb hits during WWII. "775" - number of rooms. "1,514" - number of doors. "garden" - garden parties are a famous tradition at Buckingham Palace.'
      },
      {
        id: 7,
        title: 'Summary Completion - Exercise 2',
        topic: 'The Terracotta Army',
        description: 'Complete the summary about the Terracotta Army using words from the recording.',
        audioUrl: '/audio/terracotta-army.mp3',
        imageUrl: '/images/terracotta-army.jpg',
        questions: [
          'Complete the summary below using NO MORE THAN TWO WORDS for each answer.',
          '',
          'The Terracotta Army was buried with the emperor to ________ him in his afterlife.',
          'The figures date from approximately the late ________.',
          'The figures were discovered in 1974 by ________ in Xi\'an.',
          'The three pits contain more than 8,000 ________.',
          'The pits also contain 130 chariots with 520 horses and ________ cavalry horses.'
        ],
        transcript: `The Terracotta Army is a collection of terracotta sculptures depicting the armies of the first Emperor of China. It is a form of funerary art buried with the emperor in 210–209 BC and whose purpose was to protect the emperor in his afterlife.

The figures, dating from approximately the late third century BC, were discovered in 1974 by local farmers in Xi'an. The figures vary in height according to their roles, with the tallest being the generals. The figures include warriors, chariots and horses. Estimates from 2007 were that the three pits containing the Terracotta Army held more than 8,000 soldiers, 130 chariots with 520 horses and 150 cavalry horses, the majority of which remained buried in the pits nearby. Other terracotta non-military figures were found in other pits, including officials, acrobats, strongmen and musicians.`,
        answers: [
          'protect',
          'third century BC',
          'local farmers',
          'soldiers',
          '150'
        ],
        vocabulary: 'sculpture = three-dimensional work of art (for example a statue), to depict = show, illustrate, represent, funerary art = art for funerals, purpose = aim / function, afterlife = life after death, figures = a person\'s bodily shape, a copy of a person, vary = differ, warrior = soldier, chariot = a horse-drawn vehicle, majority = greater part, a pit = a hole in the ground, acrobat = an entertainer who is excellent in gymnastic achievements',
        answerExplanation: 'The answers are: "protect" - the purpose was to protect the emperor. "third century BC" - dating from the late third century BC. "local farmers" - discovered by local farmers in 1974. "soldiers" - more than 8,000 soldiers. "150" - 150 cavalry horses.'
      }
    ]
  };

  // Sentence Completion Content
  const sentenceCompletionContent = {
    title: 'IELTS Listening Practice: Sentence Completion',
    description: 'IELTS listening sentence completion questions are basically gap fill questions that require you to fill a gap in the sentence with either words or numbers or a combination of words and numbers. Use the tips below to learn the right techniques for this type of listening question.',
    
    tips: [
      'Prepare Sentences: You will have time to read through the sentences before the recording starts.',
      'Predict Answers: You can predict what type of word the answer will be, such as a verb or noun.',
      'Grammar Will Help: The sentence must be grammatically correct when you put the missing word into the sentence.',
      'Answers in Order: The answers to the questions will come in order in the recording.',
      'Answer Word Count: The instructions will always tell you how many words or numbers you can have for the answer.',
      'Keywords: The question will have useful keywords in it to help you locate the answer.',
      'Paraphrasing: Many keywords will be paraphrased so you might not hear the keywords precisely as they are shown in the question.',
      'Speed: You do not have a lot of time to prepare question by reading them, spotting keywords and also paraphrasing.',
      'Before or After Keywords: You might hear the answer before or after you hear the keyword.',
      'Guess: If you don\'t know the answer, just guess. Never leave an answer empty.',
      'Spelling counts: If your answer is spelled incorrectly, it will be marked wrong.',
      'Listen Only Once: Remember, you will hear the recording only once and you won\'t be able to pause it.'
    ],
    
    practices: [
      {
        id: 8,
        title: 'Sentence Completion - Exercise 1',
        topic: 'Autism Awareness',
        description: 'Complete the sentences below using NO MORE THAN TWO WORDS for each answer.',
        audioUrl: '/audio/autism-awareness.mp3',
        imageUrl: '/images/autism-awareness.jpg',
        questions: [
          'Complete the sentences below.',
          'Write NO MORE THAN TWO WORDS for each answer.',
          '',
          'Autism affects the way a person ____________ and responds to people.',
          'Autism Hour is when businesses agree to dim their lights and reduce background ____________.',
          'Autistic people have difficulty processing sensory information leading to sensory ____________.',
          'In a world ____________ towards neuro-typical people, autistic people can be restricted.',
          'Autism Hour also provides an opportunity for staff to learn more about autism and its effect on ____________ information.'
        ],
        transcript: `There are 700,000 autistic people in the UK. Autism is a lifelong disability which affects how a person communicates and responds to people and how they experience the world around them. Although most of the public have heard of autism, few actually understand what it is like to live with it and how to support someone with autism. Autism Hour is when businesses agree to dim their lights and reduce background noise, such as music, to create an environment that is more suitable for autistic people. Autistic people have difficulty processing sensory information leading to sensory overload which can cause great stress and even physical pain. In a world geared towards neuro-typical people, this problem can leave autistic people restricted in where they can go and what they can enjoy. Autism Hour not only opens doors to autistic shoppers and their families, it also provides an opportunity for staff members to learn more about autism which is essential if autistic people are to get the support and respect they need from society. Autism Hour is also important in bringing to light the general affect that sensory information can have on people who are not neuro-typical or who have an illness affecting their ability to cope with light or noise or any other type of sensory information.`,
        answers: [
          'communicates',
          'noise',
          'overload',
          'geared',
          'sensory'
        ],
        answerExplanation: 'Answers must be spelled correctly. "communicates" must have "s" at the end. "overload" is one word. "geared" - as in "geared towards". "sensory" - sensory information.',
        vocabulary: 'autistic = person with autism, neuro-typical = a person without autism, sensory overload = when sensory information becomes overwhelming'
      }
    ]
  };

  // Numbers Practice Content
  const numbersPracticeContent = {
    title: 'Listening Practice for Numbers',
    description: 'This lesson focuses on listening for numbers. Make sure you have a pencil and paper ready. Write down the numbers you hear. Each listening has 10 or 9 numbers.',
    
    tips: [
      'Listen carefully for the difference between teen numbers (13, 14, 15) and ty numbers (30, 40, 50)',
      'Pay attention to hundreds and thousands - numbers like 116, 332, 480',
      'For large numbers, listen for thousand separators - 2,350 means two thousand three hundred fifty',
      'Practice distinguishing between similar sounding numbers like 80,500 and 80,000',
      'Write numbers as digits, not words, to save time',
      'Use commas for thousands to keep numbers clear (e.g., 10,300)',
      'Check your answers by listening again if possible',
      'Common mistakes include mixing up 13/30, 14/40, 15/50',
      'For numbers like 80,500 - the "and" is sometimes implied'
    ],
    
    practices: [
      {
        id: 9,
        title: 'Numbers Practice - Section 1',
        topic: 'Numbers 1 to 100',
        description: 'Listen to the recording and write down the numbers you hear between 1 and 100.',
        audioUrl: '/audio/numbers-1-100.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____',
          'Question 10: _____'
        ],
        transcript: `Number 8... Number 13... Number 50... Number 24... Number 47... Number 86... Number 19... Number 97... Number 17... Number 29...`,
        answers: [
          '8',
          '13',
          '50',
          '24',
          '47',
          '86',
          '19',
          '97',
          '17',
          '29'
        ],
        answerExplanation: 'These are numbers between 1 and 100. Pay attention to teen numbers (13, 17, 19) vs ty numbers (50).'
      },
      {
        id: 10,
        title: 'Numbers Practice - Section 2',
        topic: 'Numbers from 100 to 1,000',
        description: 'Listen to the recording and write down the numbers you hear between 100 and 1,000.',
        audioUrl: '/audio/numbers-100-1000.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____',
          'Question 10: _____'
        ],
        transcript: `Number 116... Number 196... Number 332... Number 480... Number 390... Number 830... Number 901... Number 642... Number 589... Number 772...`,
        answers: [
          '116',
          '196',
          '332',
          '480',
          '390',
          '830',
          '901',
          '642',
          '589',
          '772'
        ],
        answerExplanation: 'These are numbers between 100 and 1,000. Pay attention to hundreds and tens places.'
      },
      {
        id: 11,
        title: 'Numbers Practice - Section 3',
        topic: 'Numbers from 1,000 to 1,000,000',
        description: 'Listen to the recording and write down the numbers you hear between 1,000 and 1,000,000.',
        audioUrl: '/audio/numbers-1000-1000000.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____'
        ],
        transcript: `Number 2,350... Number 6,719... Number 10,300... Number 65,000... Number 12,450... Number 15,000... Number 28,560... Number 990,999...`,
        answers: [
          '2,350',
          '6,719',
          '10,300',
          '65,000',
          '12,450',
          '15,000',
          '28,560',
          '990,999'
        ],
        answerExplanation: 'Note: 80,500 was in the original list but missing from the audio. These are larger numbers requiring attention to thousands and hundreds.'
      }
    ]
  };

  // City Names Practice Content
  const cityNamesContent = {
    title: 'Spelling Practice for IELTS Listening: City Names',
    description: 'Spelling practice for city names and other place names, such as towns. Improve your listening and spelling by listening to the spelling of particular places and writing down the letters you hear. This is important practice for IELTS listening section 1.',
    
    tips: [
      'Writing down the letters you hear',
      'The place names will be given and then spelled',
      'Each place name will be spelled only once',
      'Pay attention to silent letters (e.g., Leicester has a silent "ce" sound)',
      'Listen carefully for double letters (e.g., Gillingham has double "l")',
      'British place names often have unique spellings that don\'t match pronunciation',
      'Practice with common British city names that frequently appear in IELTS',
      'Focus on the spelling of the ending of words (e.g., -ham, -shire, -wich)',
      'Write down each letter as you hear it to avoid forgetting'
    ],
    
    practices: [
      {
        id: 12,
        title: 'City Names Practice - 15 Towns & Cities',
        topic: 'British Town and City Names',
        description: 'Listen to the recording and write down the 15 town and city names. Each place name will be spelled only once.',
        audioUrl: '/audio/city-names.mp3',
        imageUrl: null,
        questions: [
          'Write down the city/town names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________',
          '11. _______________',
          '12. _______________',
          '13. _______________',
          '14. _______________',
          '15. _______________'
        ],
        transcript: `Birmingham - B-I-R-M-I-N-G-H-A-M
Carlisle - C-A-R-L-I-S-L-E
Chichester - C-H-I-C-H-E-S-T-E-R
Leicester - L-E-I-C-E-S-T-E-R
Peterborough - P-E-T-E-R-B-O-R-O-U-G-H
Truro - T-R-U-R-O
Wolverhampton - W-O-L-V-E-R-H-A-M-P-T-O-N
Amersham - A-M-E-R-S-H-A-M
Framlingham - F-R-A-M-L-I-N-G-H-A-M
Gillingham - G-I-L-L-I-N-G-H-A-M
Goole - G-O-O-L-E
Ormskirk - O-R-M-S-K-I-R-K
Painswick - P-A-I-N-S-W-I-C-K
Rochdale - R-O-C-H-D-A-L-E
Sawbridgeworth - S-A-W-B-R-I-D-G-E-W-O-R-T-H`,
        answers: [
          'Birmingham',
          'Carlisle',
          'Chichester',
          'Leicester',
          'Peterborough',
          'Truro',
          'Wolverhampton',
          'Amersham',
          'Framlingham',
          'Gillingham',
          'Goole',
          'Ormskirk',
          'Painswick',
          'Rochdale',
          'Sawbridgeworth'
        ],
        answerExplanation: 'These are British town and city names. Pay attention to silent letters: Leicester (pronounced "Lester"), Worcester (not in this list but similar pattern). Note the double "l" in Gillingham and the unique spelling of Sawbridgeworth.'
      }
    ]
  };

  // Names Practice Content
  const namesPracticeContent = {
    title: 'Listening Practice for English Names',
    description: 'These two listening practices focus on listening for English names. This practice is important for students preparing for their IELTS test as well as other students studying English or planning to move to the UK.',
    
    tips: [
      'Listen for titles (Mr, Mrs, Miss, Ms, Dr, Sir) - if there is a title, you must write it',
      'Write down the complete name given in the recording',
      'Some names will be spelled out letter by letter, others will not',
      'Pay attention to the difference between similar sounding names (e.g., Sean vs Shaun)',
      'Note that British names may have different spellings than American names',
      'Initials like "C J" are common - write them with spaces',
      'Capital letters matter for proper names - ensure correct capitalization',
      'Practice common English names to become familiar with them',
      'Some names may have silent letters (e.g., Bartholomew has a silent "h")',
      'Listen carefully for double letters (e.g., Billings has double "l")'
    ],
    
    practices: [
      {
        id: 13,
        title: 'Names Practice - Exercise 1',
        topic: 'Common English Names - Part 1',
        description: 'Listen to the recording and write down the 10 names you hear.',
        audioUrl: '/audio/names-practice-1.mp3',
        imageUrl: null,
        questions: [
          'Write down the names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________'
        ],
        transcript: `David Darwin
Mrs Alice Smith
Balthazar Jones
Sara Bartholomew
Sean Bean
Mr Frank Allenson
A R Beevers
James Chichester
Mary Schooling
Sir Paul McKellen`,
        answers: [
          'David Darwin',
          'Mrs Alice Smith',
          'Balthazar Jones',
          'Sara Bartholomew',
          'Sean Bean',
          'Mr Frank Allenson',
          'A R Beevers',
          'James Chichester',
          'Mary Schooling',
          'Sir Paul McKellen'
        ],
        answerExplanation: 'Notice the titles: "Mrs" for a married woman, "Mr" for a man, "Sir" for a knight. Note the spelling of "Bartholomew" (has a silent "h") and "Chichester" (a British place name used as a surname). "Sean" is pronounced "Shawn".'
      },
      {
        id: 14,
        title: 'Names Practice - Exercise 2',
        topic: 'Common English Names - Part 2',
        description: 'Listen to the recording and write down the 10 names you hear. Think about the mistakes you made in the previous practice and see if you can improve.',
        audioUrl: '/audio/names-practice-2.mp3',
        imageUrl: null,
        questions: [
          'Write down the names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________'
        ],
        transcript: `Dr Davis
Richard Chamberlain
Miss Victoria Halley
Mr C J Billings
Robert Powers
Emily Jackson
Nora Ingalls
Mrs Caroline Castle
Charles Pringle
Emma Ford`,
        answers: [
          'Dr Davis',
          'Richard Chamberlain',
          'Miss Victoria Halley',
          'Mr C J Billings',
          'Robert Powers',
          'Emily Jackson',
          'Nora Ingalls',
          'Mrs Caroline Castle',
          'Charles Pringle',
          'Emma Ford'
        ],
        answerExplanation: 'Note the titles: "Dr" (Doctor), "Miss" (unmarried woman), "Mrs" (married woman), "Mr" (man). "C J" are initials - write them with a space. "Chamberlain" has a silent "ch" at the end. "Pringle" is a common British surname. "Ford" is a common surname (like Henry Ford).'
      }
    ]
  };

  const contentData = {
    listening: {
      description: 'IELTS listening practice with essential tips and techniques to maximise your score. You must do more than simply practice IELTS listening, you must analyse your answers, develop awareness of question types and also build techniques.',
      testInfo: {
        title: 'IELTS Listening Test Information',
        points: [
          'There is only one listening test for all IELTS candidates.',
          'The IELTS listening test lasts for a total of 40 mins. The recording lasts for 30 mins.',
          'Paper-based test: You have 10 mins to transfer answers.',
          'Computer-based test: You have 2 mins to check your answers.',
          'There are 40 questions with one point for each correct answer.',
          'You can only listen to the recording once.',
          'You will hear a variety of accents.',
          'The listening test is about multi-tasking – listen, read questions, and write answers simultaneously.'
        ]
      },
      questionTypes: [
        'Sentence Completion', 'Summary Completion', 'Form Completion', 'Note Completion',
        'Multiple Choice', 'Short Answer Questions', 'Table Completion', 'Diagram Labelling',
        'Map/Plan Completion', 'Flow Chart Completion'
      ],
      sections: [
        { name: 'Section 1 & 2', description: 'Based on social situations' },
        { name: 'Section 3 & 4', description: 'Based on education/training and lectures' }
      ],
      challenges: [
        'Concentration', 'Losing your place in the recording', 'Writing the wrong number of words for your answer',
        'Not spotting paraphrases', 'Getting distracted by detail'
      ],
      practiceLessons: [
        { title: 'MULTIPLE CHOICE PRACTICE WITH TIPS', type: 'Multiple Choice', hasModal: true, modalContent: multipleChoiceContent },
        { title: 'MAP QUESTIONS PRACTICE WITH TIPS', type: 'Map/Plan' },
        { title: 'DIAGRAM QUESTIONS PRACTICE WITH TIPS', type: 'Diagram', hasModal: true, modalContent: diagramQuestionsContent },
        { title: 'SECTION 4 PRACTICE WITH TIPS', type: 'Section 4' },
        { title: 'SUMMARY COMPLETION PRACTICE WITH TIPS', type: 'Summary', hasModal: true, modalContent: summaryCompletionContent },
        { title: 'TABLE COMPLETION PRACTICE WITH TIPS', type: 'Table' },
        { title: 'SENTENCE COMPLETION PRACTICE WITH TIPS', type: 'Sentence', hasModal: true, modalContent: sentenceCompletionContent },
        { title: 'SHORT ANSWER QUESTIONS PRACTICE WITH TIPS', type: 'Short Answer' },
        { title: 'NUMBERS PRACTICE', type: 'Numbers', hasModal: true, modalContent: numbersPracticeContent },
        { title: 'LISTENING FOR ADDRESSES', type: 'Addresses' },
        { title: 'LISTENING FOR CITY NAMES', type: 'City Names', hasModal: true, modalContent: cityNamesContent },
        { title: 'LISTENING FOR LETTERS: ALPHABET PRACTICE', type: 'Alphabet' },
        { title: 'SPELLING FOR NAMES', type: 'Spelling', hasModal: true, modalContent: namesPracticeContent },
        { title: 'BIG NUMBERS PRACTICE', type: 'Numbers' }
      ],
      tips: [
        'Read questions before each section starts',
        'Underline keywords in questions',
        'Watch for paraphrasing – answers are rarely word-for-word',
        'Write answers on the question paper first, then transfer',
        'Check spelling and grammar during transfer time',
        'Pay attention to word limits (e.g., "no more than two words")',
        'Stay focused – you only hear the recording once'
      ]
    },
    reading: {
      description: 'Master the Academic and General Training Reading tests with effective strategies.',
      features: [
        '3 sections, 40 questions (60 minutes)',
        '14 different question types analyzed',
        'Skimming and scanning techniques',
        'Time management strategies',
        'True/False/Not Given masterclass'
      ],
      tips: [
        "Don't read the whole passage first – read questions",
        'Use keywords to locate answers quickly',
        'Watch for synonyms and paraphrasing',
        'Manage your time – 20 minutes per passage'
      ]
    },
    writing: {
      description: 'Excel in both Academic and General Training Writing tasks.',
      features: [
        'Task 1 Academic: Report writing (charts, graphs, diagrams)',
        'Task 1 General Training: Letter writing',
        'Task 2 Essay writing for both tests',
        'Marking criteria explained',
        'Band score descriptors for 7, 8, 9'
      ],
      tips: [
        'Analyse the task before writing',
        'Plan your essay structure (5-10 minutes)',
        'Use paragraphing effectively',
        'Proofread for errors before finishing'
      ]
    },
    speaking: {
      description: 'Achieve fluency and confidence in the face-to-face Speaking test.',
      features: [
        'Part 1: Introduction & Interview (4-5 mins)',
        'Part 2: Individual Long Turn (3-4 mins)',
        'Part 3: Two-way Discussion (4-5 mins)',
        'Fluency and coherence strategies',
        'Lexical resource development'
      ],
      tips: [
        'Extend your answers naturally',
        'Use a range of vocabulary',
        'Practice speaking for 2 minutes without stopping',
        'Record yourself to identify areas for improvement'
      ]
    },
    vocabulary: {
      description: 'Expand your lexical resource for higher band scores.',
      features: [
        'Topic-specific vocabulary lists',
        'Academic word list',
        'Idiomatic language for Speaking',
        'Collocations and word families',
        'Paraphrasing techniques'
      ],
      tips: [
        'Learn words in context',
        'Use new vocabulary in speaking and writing',
        'Keep a vocabulary notebook',
        'Review words regularly'
      ]
    },
    topics: {
      description: 'Master common IELTS topics and themes.',
      features: [
        'Common IELTS topics analyzed',
        'Topic-specific vocabulary',
        'Model answers for popular topics',
        'Recent exam questions database'
      ],
      tips: [
        'Prepare ideas for common topics',
        'Learn topic-specific vocabulary',
        'Practice writing essays on various topics',
        'Stay updated with current events'
      ]
    },
    ontheday: {
      description: 'Essential tips for the day of your IELTS exam.',
      features: [
        'What to bring on test day',
        'Arrival and registration process',
        'Time management strategies',
        'Handling test day anxiety',
        'Final preparation checklist'
      ],
      tips: [
        'Get a good night\'s sleep',
        'Eat a healthy breakfast',
        'Arrive at least 30 minutes early',
        'Bring your passport/ID',
        'Stay calm and confident'
      ]
    },
    topresults: {
      description: 'Learn from successful IELTS candidates who achieved band 7, 8, and 9.',
      features: [
        'Success stories from band 9 achievers',
        'Study strategies that worked',
        'Common mistakes to avoid',
        'Resources recommended by top scorers'
      ],
      tips: [
        'Set realistic goals',
        'Practice consistently every day',
        'Learn from your mistakes',
        'Get feedback from qualified teachers'
      ]
    },
    advanced: {
      description: 'Advanced strategies for candidates targeting band 8 and 9.',
      features: [
        'Advanced grammar structures',
        'Sophisticated vocabulary usage',
        'Complex sentence construction',
        'Critical thinking for essays',
        'Nuanced speaking techniques'
      ],
      tips: [
        'Read academic articles daily',
        'Listen to podcasts and lectures',
        'Practice with higher-level materials',
        'Focus on precision and accuracy'
      ]
    }
  };

  const activeContent = contentData[activeTab] || contentData.listening;
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  const handleLessonClick = (lesson) => {
    if (lesson.hasModal && lesson.modalContent) {
      openModal(lesson.modalContent);
    } else {
      window.open('https://wa.me/2347061066372', '_blank');
    }
  };

  // Collapsible Section Component with hover effects
  const CollapsibleSection = ({ title, content, isOpen, onToggle, icon }) => {
    return (
      <div className="bg-dark-100/50 rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg">
        <button
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center justify-between bg-primary-500/10 hover:bg-primary-500/20 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg transition-transform duration-300 group-hover:scale-125">{icon}</span>
            <span className="text-white font-bold text-base md:text-lg transition-all duration-300 group-hover:text-primary-400 group-hover:tracking-wide">{title}</span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 transition-transform duration-300 group-hover:text-primary-400"
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                {typeof content === 'string' ? (
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">{content}</p>
                ) : (
                  <div className="space-y-2">
                    {content.map((item, idx) => (
                      <p key={idx} className="text-gray-300 text-sm md:text-base font-medium">{item}</p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Audio Player Component with hover effects
  const AudioPlayer = ({ practiceId, audioUrl, isPlaying, onToggle }) => {
    if (!audioUrl) return null;
    
    return (
      <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:border-primary-500/30 border border-transparent">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" fill="white" />
                  <rect x="14" y="4" width="4" height="16" fill="white" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Pause Recording</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Play Recording</span>
              </>
            )}
          </button>
          <div className="text-sm text-gray-300">
            <span className="font-bold text-base">🎧 IELTS Listening Practice</span>
            <p className="text-xs text-gray-400 mt-1">Listen carefully and write down the names</p>
          </div>
        </div>
        <audio
          ref={el => audioRefs.current[practiceId] = el}
          src={audioUrl}
          onEnded={() => handleAudioEnded(practiceId)}
          className="hidden"
        />
      </div>
    );
  };

  // Comment Section Component (FIXED)
const CommentSection = () => {
  const categoryComments = comments[activeTab] || [];
  
  // Local form state (stays stable)
  const [localName, setLocalName] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [localWebsite, setLocalWebsite] = useState('');
  const [localComment, setLocalComment] = useState('');
  const [localNotifyFollowup, setLocalNotifyFollowup] = useState(false);
  const [localNotifyPosts, setLocalNotifyPosts] = useState(false);
  const [submittingLocal, setSubmittingLocal] = useState(false);

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!localName || !localEmail || !localComment) {
      alert('Please fill in all required fields');
      return;
    }
    setSubmittingLocal(true);
    
    const newComment = {
      id: Date.now(),
      name: localName,
      email: localEmail,
      website: localWebsite,
      comment: localComment,
      date: new Date().toLocaleString(),
      notifyFollowup: localNotifyFollowup,
      notifyPosts: localNotifyPosts
    };
    
    setTimeout(() => {
      setComments(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newComment]
      }));
      // Reset local fields
      setLocalName('');
      setLocalEmail('');
      setLocalWebsite('');
      setLocalComment('');
      setLocalNotifyFollowup(false);
      setLocalNotifyPosts(false);
      setSubmittingLocal(false);
      alert('Comment posted successfully!');
    }, 500);
  };

  return (
    <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 mt-8">
      <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">💬</span> Speak Your Mind
      </h3>
      
      {/* Display existing comments */}
      {categoryComments.length > 0 && (
        <div className="mb-6 space-y-4">
          <h4 className="text-lg font-bold text-primary-400">Comments ({categoryComments.length})</h4>
          {categoryComments.map((comment) => (
            <div key={comment.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-primary-400">{comment.name}</span>
                  <span className="text-gray-500 text-sm ml-2">said:</span>
                </div>
                <span className="text-gray-500 text-xs">{comment.date}</span>
              </div>
              <p className="text-gray-300">{comment.comment}</p>
              {comment.website && (
                <p className="text-gray-500 text-xs mt-2">Website: {comment.website}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Comment Form with fully local state */}
      <form onSubmit={handleLocalSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 font-bold">Name *</label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Enter your name"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-bold">Email *</label>
            <input
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2 font-bold">Website</label>
          <input
            type="url"
            value={localWebsite}
            onChange={(e) => setLocalWebsite(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Your website (optional)"
            autoComplete="off"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2 font-bold">Comment *</label>
          <textarea
            value={localComment}
            onChange={(e) => setLocalComment(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Share your thoughts, questions, or feedback..."
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localNotifyFollowup}
              onChange={(e) => setLocalNotifyFollowup(e.target.checked)}
              className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
            />
            <span className="text-gray-400 text-sm">Notify me of follow-up comments by email.</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localNotifyPosts}
              onChange={(e) => setLocalNotifyPosts(e.target.checked)}
              className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
            />
            <span className="text-gray-400 text-sm">Notify me of new posts by email.</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={submittingLocal}
          className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-extrabold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
        >
          {submittingLocal ? 'Posting...' : 'POST COMMENT'}
        </button>
      </form>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-dark-100 py-20 px-4 relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            IELTS Preparation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-bold">
            Free IELTS lessons, tips, and model answers to help you achieve your target band score.
          </p>
        </motion.div>

        {/* Categories with hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-bold ${
                activeTab === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:shadow-md'
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className={`bg-gradient-to-r ${activeCategory.color}/20 rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl transition-transform duration-300 hover:scale-125">{activeCategory.icon}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{activeCategory.title}</h2>
            </div>
            <p className="text-gray-300 text-base md:text-lg font-bold">{activeContent.description}</p>
          </div>

          {/* Test Information Section (Listening specific) */}
          {activeTab === 'listening' && activeContent.testInfo && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> {activeContent.testInfo.title}
              </h3>
              <ul className="space-y-2">
                {activeContent.testInfo.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300 text-base md:text-lg font-medium">
                    <span className="text-primary-500 mt-0.5 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Question Types (Listening specific) */}
          {activeTab === 'listening' && activeContent.questionTypes && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">❓</span> IELTS Listening Question Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeContent.questionTypes.map((type, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-primary-500/20 text-primary-300 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:bg-primary-500/40 hover:scale-105 hover:shadow-md">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sections (Listening specific) */}
          {activeTab === 'listening' && activeContent.sections && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">📑</span> Sections of the IELTS Listening Test
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeContent.sections.map((section, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                    <p className="text-white font-bold text-base md:text-lg">{section.name}</p>
                    <p className="text-gray-400 text-sm md:text-base font-medium">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Challenges (Listening specific) */}
          {activeTab === 'listening' && activeContent.challenges && (
            <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:border-yellow-500/40">
              <h3 className="text-xl md:text-2xl font-extrabold text-yellow-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">⚠️</span> Biggest Challenges
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeContent.challenges.map((challenge, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:bg-yellow-500/40 hover:scale-105 hover:shadow-md">
                    {challenge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Practice Lessons (Listening specific) */}
          {activeTab === 'listening' && activeContent.practiceLessons && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">🎧</span> IELTS Listening Practice Lessons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeContent.practiceLessons.map((lesson, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLessonClick(lesson)}
                    className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-primary-500/20 transition-all duration-300 group"
                  >
                    <p className="text-white text-sm md:text-base font-bold group-hover:text-primary-400 group-hover:text-lg transition-all duration-300">{lesson.title}</p>
                    <p className="text-gray-500 text-xs font-medium">{lesson.type}</p>
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-4 italic font-medium">
                Click any lesson to access comprehensive practice materials and expert tips.
              </p>
            </div>
          )}

          {/* Instructions Section (Listening specific) */}
          {activeTab === 'listening' && (
            <div className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/20 transition-all duration-300 hover:shadow-xl hover:border-primary-500/40">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> IELTS Listening Test Instructions
              </h3>
              <p className="text-gray-300 text-base md:text-lg mb-3 font-bold">
                With each set of questions, you will be given instructions about the answer.
              </p>
              <div className="bg-white/5 rounded-lg p-4 mt-3 transition-all duration-300 hover:bg-white/10">
                <p className="text-white font-extrabold text-base md:text-lg mb-2">No more than three words and/or numbers</p>
                <ul className="text-gray-400 text-sm md:text-base space-y-1">
                  <li className="font-bold">• one word (with numbers or without)</li>
                  <li className="font-bold">• two words (with numbers or without)</li>
                  <li className="font-bold">• three words (with numbers or not)</li>
                  <li className="text-red-400 font-extrabold">• You cannot write four or more words</li>
                </ul>
              </div>
            </div>
          )}

          {/* Regular Features Section (for other tabs) */}
          {activeTab !== 'listening' && activeContent.features && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="text-primary-500 text-2xl transition-transform duration-300 hover:scale-125">📋</span> Key Features & Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeContent.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                    <span className="text-primary-500 mt-0.5 font-bold text-lg">→</span>
                    <span className="text-gray-300 text-sm md:text-base font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Tips */}
          <div className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/20 transition-all duration-300 hover:shadow-xl hover:border-primary-500/40">
            <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
              <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Tips for Success
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeContent.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                  <span className="text-green-500 mt-0.5 font-bold text-lg">✓</span>
                  <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Free Resources Banner */}
          <div className="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-xl p-5 border border-white/10 transition-all duration-300 hover:shadow-xl hover:border-primary-500/30">
            <h3 className="font-extrabold text-white mb-2 flex items-center gap-2 text-xl md:text-2xl">
              <span className="text-2xl transition-transform duration-300 hover:scale-125">📚</span> Free IELTS Resources
            </h3>
            <p className="text-gray-400 text-sm md:text-base font-bold">
              Access hundreds of free IELTS practice lessons, model answers, test tips, and topic-based vocabulary.
            </p>
            <div className="flex gap-3 mt-4">
              <Link to="/register" className="px-4 py-2 bg-primary-600 rounded-lg text-white text-sm md:text-base font-extrabold hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Preparation
              </Link>
              <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm md:text-base font-extrabold hover:bg-green-600/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                💬 Ask a Question
              </button>
            </div>
          </div>

          {/* Success Quote */}
          <div className="text-center py-4">
            <p className="text-gray-400 italic text-base md:text-lg font-bold">
              "Success is within your grasp! Develop your skills & techniques with strategic IELTS preparation."
            </p>
            <p className="text-primary-400 mt-2 font-extrabold text-base md:text-lg">- Good luck from JEO Digital Team</p>
          </div>

          {/* Comment Section - Added at the bottom of each category */}
          <CommentSection />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-2xl hover:border-primary-500/50"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Ready to Achieve Your Target Band Score?</h2>
          <p className="text-gray-400 mb-6 text-base md:text-lg font-bold">Join our comprehensive IELTS preparation program today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-extrabold text-base md:text-lg hover:opacity-90 transition-all duration-300 hover:scale-110 hover:shadow-xl">
              Enroll Now
            </Link>
            <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg font-extrabold text-base md:text-lg hover:bg-green-600/30 transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center gap-2">
              💬 Contact for Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-primary-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">{modalData.title}</h2>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <p className="text-gray-300 text-base md:text-lg font-bold">{modalData.description}</p>

                {modalData.tips && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Tips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modalData.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                          <span className="text-primary-500 mt-0.5 font-bold text-lg">•</span>
                          <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> Practice Lessons
                  </h3>
                  <div className="space-y-4">
                    {modalData.practices.map((practice, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:shadow-lg">
                        <h4 className="text-white font-extrabold text-lg md:text-xl mb-2">{practice.title}</h4>
                        <p className="text-gray-400 text-sm md:text-base mb-3 font-bold">{practice.topic}</p>
                        
                        <AudioPlayer
                          practiceId={practice.id}
                          audioUrl={practice.audioUrl}
                          isPlaying={audioStates[practice.id]}
                          onToggle={() => toggleAudio(practice.id)}
                        />
                        
                        {practice.imageUrl && (
                          <div className="mb-4 transition-all duration-300 hover:scale-105">
                            <img src={practice.imageUrl} alt={practice.topic} className="rounded-lg max-w-full h-auto border border-white/20" />
                          </div>
                        )}
                        
                        {practice.questions && (
                          <div className="mb-3">
                            <p className="text-gray-300 text-sm md:text-base font-extrabold mb-2">Questions:</p>
                            <div className="space-y-1">
                              {practice.questions.map((q, qIdx) => (
                                <p key={qIdx} className="text-gray-400 text-sm md:text-base font-bold">{q}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        <CollapsibleSection
                          title="Recording Transcript"
                          content={practice.transcript}
                          isOpen={expandedSections[`${practice.id}-transcript`]}
                          onToggle={() => toggleSection(practice.id, 'transcript')}
                          icon="📝"
                        />

                        <CollapsibleSection
                          title="Answers"
                          content={Array.isArray(practice.answers) ? practice.answers : [practice.answers]}
                          isOpen={expandedSections[`${practice.id}-answers`]}
                          onToggle={() => toggleSection(practice.id, 'answers')}
                          icon="✅"
                        />

                        {practice.answerExplanation && (
                          <CollapsibleSection
                            title="Answer Explanation"
                            content={practice.answerExplanation}
                            isOpen={expandedSections[`${practice.id}-explanation`]}
                            onToggle={() => toggleSection(practice.id, 'explanation')}
                            icon="📖"
                          />
                        )}

                        {practice.vocabulary && (
                          <CollapsibleSection
                            title="Vocabulary"
                            content={practice.vocabulary}
                            isOpen={expandedSections[`${practice.id}-vocabulary`]}
                            onToggle={() => toggleSection(practice.id, 'vocabulary')}
                            icon="📚"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button onClick={closeModal} className="flex-1 px-4 py-2 bg-primary-600 rounded-lg text-white font-extrabold hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Close
                  </button>
                  <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="flex-1 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg font-extrabold hover:bg-green-600/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                    💬 Need Help?
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IELTS;