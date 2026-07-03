const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const logger = require('../utils/logger');
const {
  User,
  Course,
  Enrollment,
  Blog,
  Batch,
  Test,
  TestResult,
  Assignment,
  AssignmentSubmission,
  Certificate,
  Notification,
  Wishlist,
  Contact,
  Review,
} = require('../models');

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Enrollment.deleteMany({}),
      Blog.deleteMany({}),
      Batch.deleteMany({}),
      Test.deleteMany({}),
      TestResult.deleteMany({}),
      Assignment.deleteMany({}),
      AssignmentSubmission.deleteMany({}),
      Certificate.deleteMany({}),
      Notification.deleteMany({}),
      Wishlist.deleteMany({}),
      Contact.deleteMany({}),
      Review.deleteMany({}),
    ]);

    logger.info('Cleared existing data');

    const adminPassword = await bcrypt.hash('Admin@123', 12);
    const teacherPassword = await bcrypt.hash('Teacher@123', 12);
    const studentPassword = await bcrypt.hash('Student@123', 12);

    const admins = await User.insertMany([
      {
        name: 'Dr. Vikram Singh',
        email: 'vikram.singh@eduserve.in',
        phone: '9876543210',
        password: adminPassword,
        role: 'admin',
        isVerified: true,
        bio: 'Founder and CEO of EduServe with over 20 years of experience in Indian education. PhD in Educational Technology from IIT Bombay. Passionate about making quality education accessible to every Indian student.',
      },
      {
        name: 'Ananya Gupta',
        email: 'ananya.gupta@eduserve.in',
        phone: '9988776655',
        password: adminPassword,
        role: 'admin',
        isVerified: true,
        bio: 'Chief Academic Officer at EduServe. Former HOD at Delhi University with 15 years of teaching experience. Specializes in curriculum design and examination strategy for competitive exams.',
      },
    ]);

    const teachers = await User.insertMany([
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@eduserve.in',
        phone: '9812345678',
        password: teacherPassword,
        role: 'teacher',
        isVerified: true,
        bio: 'PhD in Physics from IIT Kanpur. 18 years of JEE Advanced coaching experience. Produced 50+ rankers in top 100. Known for intuitive problem-solving techniques and deep conceptual clarity.',
      },
      {
        name: 'Prof. Priya Sharma',
        email: 'priya.sharma@eduserve.in',
        phone: '9876123450',
        password: teacherPassword,
        role: 'teacher',
        isVerified: true,
        bio: 'MSc in Chemistry from IIT Delhi, Gold Medalist. 12 years of NEET and JEE teaching experience. Expert in organic chemistry and reaction mechanisms. Author of 3 bestselling chemistry books for competitive exams.',
      },
      {
        name: 'Dr. Suresh Patel',
        email: 'suresh.patel@eduserve.in',
        phone: '9765432109',
        password: teacherPassword,
        role: 'teacher',
        isVerified: true,
        bio: 'PhD in Mathematics from IISc Bangalore. 15 years of experience teaching CBSE and JEE Mathematics. Renowned for making complex mathematical concepts simple and accessible.',
      },
      {
        name: 'Neha Verma',
        email: 'neha.verma@eduserve.in',
        phone: '9654321098',
        password: teacherPassword,
        role: 'teacher',
        isVerified: true,
        bio: 'BTech in Computer Science from NIT Trichy, MTech from IIT Bombay. Senior software engineer turned educator. 8 years of experience teaching programming and data science. Founded a coding bootcamp that trained 2000+ students.',
      },
      {
        name: 'Dr. Amit Joshi',
        email: 'amit.joshi@eduserve.in',
        phone: '9543210987',
        password: teacherPassword,
        role: 'teacher',
        isVerified: true,
        bio: 'MBBS from AIIMS Delhi, gold medalist in Anatomy. 10 years of NEET UG teaching experience. Known for exceptional biology lectures and mnemonic techniques that help students memorize complex topics effortlessly.',
      },
    ]);

    const studentNames = [
      { name: 'Arjun Mehta', email: 'arjun.mehta@example.com', phone: '9123456789', city: 'Mumbai' },
      { name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '9234567890', city: 'Hyderabad' },
      { name: 'Rohit Sharma', email: 'rohit.sharma@example.com', phone: '9345678901', city: 'Delhi' },
      { name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9456789012', city: 'Ahmedabad' },
      { name: 'Akash Singh', email: 'akash.singh@example.com', phone: '9567890123', city: 'Lucknow' },
      { name: 'Divya Nair', email: 'divya.nair@example.com', phone: '9678901234', city: 'Kochi' },
      { name: 'Rahul Verma', email: 'rahul.verma@example.com', phone: '9789012345', city: 'Jaipur' },
      { name: 'Kavya Iyer', email: 'kavya.iyer@example.com', phone: '9890123456', city: 'Chennai' },
      { name: 'Vikram Deshmukh', email: 'vikram.deshmukh@example.com', phone: '9901234567', city: 'Pune' },
      { name: 'Anjali Gupta', email: 'anjali.gupta@example.com', phone: '9012345678', city: 'Kanpur' },
      { name: 'Manish Tiwari', email: 'manish.tiwari@example.com', phone: '9023456789', city: 'Patna' },
      { name: 'Pooja Yadav', email: 'pooja.yadav@example.com', phone: '9034567890', city: 'Agra' },
      { name: 'Karan Bhatia', email: 'karan.bhatia@example.com', phone: '9045678901', city: 'Chandigarh' },
      { name: 'Ishita Das', email: 'ishita.das@example.com', phone: '9056789012', city: 'Kolkata' },
      { name: 'Siddharth Joshi', email: 'siddharth.joshi@example.com', phone: '9067890123', city: 'Indore' },
    ];

    const students = await User.insertMany(
      studentNames.map((s) => ({
        name: s.name,
        email: s.email,
        phone: s.phone,
        password: studentPassword,
        role: 'student',
        isVerified: true,
        bio: `Student from ${s.city} pursuing higher education. Passionate about learning and career growth through quality online education.`,
      }))
    );

    const courses = await Course.insertMany([
      {
        title: 'IIT-JEE Advanced 2026 Complete Physics',
        slug: 'iit-jee-advanced-2026-complete-physics',
        description: {
          short: 'Master IIT-JEE Advanced Physics with comprehensive coverage of all topics, problem-solving techniques, and mock tests by IIT Kanpur PhD faculty.',
          full: 'This comprehensive course covers the entire JEE Advanced Physics syllabus in depth. From mechanics to modern physics, each topic is taught with a focus on conceptual understanding and problem-solving speed. The course includes 200+ hours of live lectures, 5000+ practice problems, and 25 full-length mock tests designed to simulate the actual JEE Advanced exam pattern. Special emphasis is placed on numerical ability, graphical analysis, and multi-concept problems that frequently appear in the advanced paper.',
        },
        category: 'JEE Advanced',
        level: 'Advanced',
        price: { amount: 24999, currency: 'INR', discount: 20 },
        duration: { totalHours: 250, totalLectures: 200, totalWeeks: 32 },
        teacher: teachers[0]._id,
        rating: { average: 4.8, count: 124 },
        enrolledCount: 342,
        isPublished: true,
        isFeatured: true,
        tags: ['JEE', 'Physics', 'IIT', 'Advanced', 'Competitive Exams'],
        prerequisites: ['Class 11 and 12 Physics basics', 'Basic calculus knowledge', 'Strong foundation in vectors and trigonometry'],
        whatYouWillLearn: [
          'Master all topics of JEE Advanced Physics with deep conceptual clarity',
          'Solve complex multi-concept problems in under 2 minutes',
          'Develop intuition for selecting the right approach for numerical problems',
          'Score 180+ marks in JEE Advanced Physics section',
          'Tackle any unexpected or out-of-the-box problem with confidence',
        ],
        language: 'Hinglish',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Physics & Measurement, Kinematics', topics: ['Units and Dimensions', 'Error Analysis', 'Motion in One Dimension', 'Motion in Two Dimensions', 'Relative Motion'] },
          { week: 2, title: 'Laws of Motion & Work Energy', topics: ['Newton\'s Laws', 'Friction', 'Circular Motion', 'Work Done by Forces', 'Kinetic & Potential Energy', 'Work-Energy Theorem'] },
          { week: 3, title: 'Rotational Motion & Gravitation', topics: ['Center of Mass', 'Moment of Inertia', 'Torque & Angular Momentum', 'Rolling Motion', 'Universal Law of Gravitation', 'Kepler\'s Laws'] },
          { week: 4, title: 'Solids, Fluids & Thermodynamics', topics: ['Elasticity', 'Viscosity & Surface Tension', 'Bernoulli\'s Principle', 'Kinetic Theory of Gases', 'Laws of Thermodynamics', 'Heat Transfer'] },
          { week: 5, title: 'Electrostatics & Current Electricity', topics: ['Coulomb\'s Law', 'Electric Field & Potential', 'Capacitors', 'Ohm\'s Law', 'Kirchhoff\'s Rules', 'Wheatstone Bridge'] },
          { week: 6, title: 'Magnetism, EMI & Modern Physics', topics: ['Magnetic Force', 'Biot-Savart Law', 'Faraday\'s Law', 'Lenz\'s Law', 'Photoelectric Effect', 'Nuclear Physics'] },
        ],
      },
      {
        title: 'NEET UG Biology Mastery Program 2026',
        slug: 'neet-ug-biology-mastery-program-2026',
        description: {
          short: 'Complete NEET Biology preparation covering Zoology and Botany with memory techniques, diagrams, and 10000+ practice questions.',
          full: 'This course is designed by Dr. Amit Joshi, an AIIMS Delhi alumnus, to provide complete NEET UG Biology preparation. The curriculum covers the entire NCERT syllabus with extensive expansions. Special focus is on diagram-based learning, mnemonics for classification, and mastering the art of answering assertion-reason questions. Includes 150+ hours of live sessions, weekly tests, and 30 full mock tests. Each chapter includes previous year question analysis and predicted questions for the upcoming NEET exam.',
        },
        category: 'NEET',
        level: 'Advanced',
        price: { amount: 19999, currency: 'INR', discount: 25 },
        duration: { totalHours: 180, totalLectures: 150, totalWeeks: 28 },
        teacher: teachers[4]._id,
        rating: { average: 4.9, count: 89 },
        enrolledCount: 567,
        isPublished: true,
        isFeatured: true,
        tags: ['NEET', 'Biology', 'Medical', 'Zoology', 'Botany'],
        prerequisites: ['Class 11 and 12 Biology (NCERT)', 'Basic understanding of cell biology'],
        whatYouWillLearn: [
          'Master entire NEET Biology syllabus with 95%+ accuracy',
          'Learn 500+ mnemonics for easy memorization of classifications and processes',
          'Solve assertion-reason and match-the-column questions confidently',
          'Complete all NCERT diagrams with proper labeling in under 30 seconds',
          'Score 340+ marks in NEET Biology section',
        ],
        language: 'Hinglish',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Diversity in Living World', topics: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Taxonomy & Systematics'] },
          { week: 2, title: 'Cell Biology & Genetics', topics: ['Cell Theory', 'Prokaryotic & Eukaryotic Cells', 'Cell Cycle & Division', 'Mendelian Genetics', 'Molecular Basis of Inheritance'] },
          { week: 3, title: 'Plant Physiology', topics: ['Photosynthesis', 'Respiration in Plants', 'Plant Growth & Development', 'Mineral Nutrition', 'Transport in Plants'] },
          { week: 4, title: 'Human Physiology I', topics: ['Digestion & Absorption', 'Breathing & Exchange of Gases', 'Body Fluids & Circulation', 'Excretory Products & Elimination'] },
          { week: 5, title: 'Human Physiology II & Reproduction', topics: ['Neural Control & Coordination', 'Chemical Coordination', 'Human Reproduction', 'Reproductive Health'] },
          { week: 6, title: 'Ecology & Environment', topics: ['Organisms & Populations', 'Ecosystem', 'Biodiversity & Conservation', 'Environmental Issues'] },
        ],
      },
      {
        title: 'CBSE Class 12 Mathematics: Complete Preparation',
        slug: 'cbse-class-12-mathematics-complete-preparation',
        description: {
          short: 'Excel in CBSE Class 12 Board Mathematics with comprehensive coverage, NCERT solutions, previous year papers, and board-specific preparation.',
          full: 'A meticulously designed course for CBSE Class 12 students aiming for 95+ in board exams. Every chapter is covered from NCERT basics to advanced application-level problems. The course includes chapter-wise worksheets, 10 previous year paper solutions, sample paper practice, and CBSE marking scheme analysis. Special doubt-clearing sessions are conducted before every major exam. Weekly assessments ensure consistent progress tracking.',
        },
        category: 'CBSE',
        level: 'Advanced',
        price: { amount: 9999, currency: 'INR', discount: 15 },
        duration: { totalHours: 120, totalLectures: 100, totalWeeks: 24 },
        teacher: teachers[2]._id,
        rating: { average: 4.7, count: 210 },
        enrolledCount: 892,
        isPublished: true,
        isFeatured: true,
        tags: ['CBSE', 'Class 12', 'Mathematics', 'Board Exams'],
        prerequisites: ['Class 11 Mathematics', 'Basic algebra and trigonometry'],
        whatYouWillLearn: [
          'Master all chapters of CBSE Class 12 Mathematics syllabus',
          'Solve NCERT exemplar and previous year board questions confidently',
          'Learn time management techniques for 3-hour board exam',
          'Score 95+ marks in CBSE Class 12 Board Mathematics',
          'Build strong foundation for JEE Main and other competitive exams',
        ],
        language: 'Hinglish',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Relations & Functions', topics: ['Types of Relations', 'Types of Functions', 'Composite Functions', 'Invertible Functions', 'Binary Operations'] },
          { week: 2, title: 'Inverse Trigonometric & Matrices', topics: ['Principal Values', 'Properties of ITF', 'Types of Matrices', 'Matrix Operations', 'Elementary Row Operations'] },
          { week: 3, title: 'Determinants & Continuity', topics: ['Properties of Determinants', 'Area of Triangle', 'Adjoint & Inverse', 'Continuity of Functions', 'Differentiability'] },
          { week: 4, title: 'Application of Derivatives & Integration', topics: ['Rate of Change', 'Increasing/Decreasing Functions', 'Tangents & Normals', 'Indefinite Integration', 'Definite Integration'] },
          { week: 5, title: 'Differential Equations & Vectors', topics: ['Order & Degree', 'Variable Separable', 'Homogeneous Equations', 'Vector Algebra', 'Dot & Cross Products'] },
          { week: 6, title: '3D Geometry & Probability', topics: ['Direction Cosines', 'Line & Plane Equations', 'Conditional Probability', 'Bayes Theorem', 'Bernoulli Trials'] },
        ],
      },
      {
        title: 'Python for Data Science: Zero to Hero',
        slug: 'python-for-data-science-zero-to-hero',
        description: {
          short: 'Learn Python programming from scratch and master data science with NumPy, Pandas, Matplotlib, and real-world Indian datasets.',
          full: 'This course takes you from a complete beginner to a confident data scientist using Python. You will start with Python fundamentals and gradually move into data analysis libraries. The curriculum uses real Indian datasets like census data, agricultural production, e-commerce transactions, and COVID-19 trends. You will build 10+ projects including a IPL data analysis dashboard, a movie recommendation system, and a stock price predictor. Each module includes hands-on coding assignments and a mini-project.',
        },
        category: 'Programming',
        level: 'Beginner',
        price: { amount: 5999, currency: 'INR', discount: 30 },
        duration: { totalHours: 80, totalLectures: 65, totalWeeks: 12 },
        teacher: teachers[3]._id,
        rating: { average: 4.6, count: 178 },
        enrolledCount: 1245,
        isPublished: true,
        isFeatured: true,
        tags: ['Python', 'Data Science', 'Programming', 'NumPy', 'Pandas'],
        prerequisites: ['Basic computer literacy', 'No prior programming knowledge required'],
        whatYouWillLearn: [
          'Write Python code confidently for data analysis tasks',
          'Manipulate and clean real-world datasets using Pandas',
          'Create stunning visualizations with Matplotlib and Seaborn',
          'Apply statistical analysis to draw insights from data',
          'Build end-to-end data science projects for your portfolio',
        ],
        language: 'English',
        mode: 'Recorded',
        syllabus: [
          { week: 1, title: 'Python Fundamentals', topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Dictionaries', 'String Operations'] },
          { week: 2, title: 'Advanced Python', topics: ['File I/O', 'Exception Handling', 'List Comprehensions', 'Lambda Functions', 'Modules & Packages'] },
          { week: 3, title: 'NumPy for Numerical Computing', topics: ['Arrays & Indexing', 'Vectorized Operations', 'Broadcasting', 'Linear Algebra', 'Random Number Generation'] },
          { week: 4, title: 'Pandas for Data Manipulation', topics: ['Series & DataFrames', 'Data Cleaning', 'GroupBy Operations', 'Merging & Joining', 'Time Series Data'] },
          { week: 5, title: 'Data Visualization', topics: ['Matplotlib Basics', 'Bar Charts & Histograms', 'Scatter Plots', 'Seaborn for Statistical Plots', 'Dashboard Creation'] },
          { week: 6, title: 'Capstone Projects', topics: ['IPL Data Analysis', 'Movie Recommendation System', 'Stock Price Predictor', 'E-commerce Sales Dashboard'] },
        ],
      },
      {
        title: 'JEE Main 2026: Complete Chemistry Module',
        slug: 'jee-main-2026-complete-chemistry-module',
        description: {
          short: 'Ace JEE Main Chemistry with Physical, Organic, and Inorganic Chemistry coverage including quick revision techniques and memory maps.',
          full: 'This specialized course covers the entire JEE Main Chemistry syllabus through a structured approach. Physical Chemistry focuses on numerical problem-solving with shortcuts. Organic Chemistry uses the reagent-based approach for reaction mechanisms. Inorganic Chemistry emphasizes periodic trends and compound properties through visualization techniques. Includes 100+ hours of lectures, 3000+ practice problems, 15 mock tests, and the unique "Chemistry Quick Revision Cards" for last-minute preparation.',
        },
        category: 'JEE Main',
        level: 'Advanced',
        price: { amount: 14999, currency: 'INR', discount: 20 },
        duration: { totalHours: 120, totalLectures: 100, totalWeeks: 20 },
        teacher: teachers[1]._id,
        rating: { average: 4.8, count: 95 },
        enrolledCount: 456,
        isPublished: true,
        isFeatured: false,
        tags: ['JEE Main', 'Chemistry', 'Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
        prerequisites: ['Class 11 and 12 Chemistry basics', 'Basic mathematical skills for Physical Chemistry'],
        whatYouWillLearn: [
          'Master all three branches of Chemistry for JEE Main',
          'Solve Physical Chemistry numerical problems in under 1 minute',
          'Remember all Organic reactions through the reagent-mapping technique',
          'Memorize Inorganic Chemistry using periodic table shortcuts',
          'Score 100+ marks in JEE Main Chemistry section',
        ],
        language: 'Hinglish',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Physical Chemistry: Basic Concepts', topics: ['Mole Concept', 'Stoichiometry', 'Concentration Terms', 'Redox Reactions', 'Equivalent Concept'] },
          { week: 2, title: 'Atomic Structure & Chemical Bonding', topics: ['Bohr Model', 'Quantum Numbers', 'Aufbau Principle', 'VBT & MOT', 'Hybridization'] },
          { week: 3, title: 'Chemical Thermodynamics', topics: ['First Law of Thermodynamics', 'Enthalpy Changes', 'Hess\'s Law', 'Gibbs Free Energy', 'Spontaneity'] },
          { week: 4, title: 'Chemical Kinetics & Equilibrium', topics: ['Rate Laws', 'Order of Reactions', 'Arrhenius Equation', 'Chemical Equilibrium', 'Le Chatelier\'s Principle'] },
          { week: 5, title: 'Organic Chemistry: Fundamentals', topics: ['Classification & Nomenclature', 'Isomerism', 'Electronic Effects', 'Reaction Mechanisms', 'Hydrocarbons'] },
          { week: 6, title: 'Inorganic Chemistry & Periodic Table', topics: ['Periodic Properties', 's-Block Elements', 'p-Block Elements', 'd & f Block Elements', 'Coordination Compounds'] },
        ],
      },
      {
        title: 'Competitive Programming with C++ (Advanced)',
        slug: 'competitive-programming-with-cpp-advanced',
        description: {
          short: 'Master competitive programming in C++ with advanced DS & Algo, tree/graph theory, dynamic programming, and CodeChef/Codeforces contest preparation.',
          full: 'Designed for aspiring competitive programmers targeting ICPC, CodeChef, Codeforces, and Google Kickstart. This advanced course covers time complexity optimizations, advanced data structures like segment trees and Fenwick trees, graph algorithms including network flow, and dynamic programming patterns. You will solve 200+ problems from past coding competitions. Weekly live coding contests simulate real competition pressure. Get mentored by candidates who have cracked Google, Microsoft, and Amazon interviews.',
        },
        category: 'Programming',
        level: 'Advanced',
        price: { amount: 12999, currency: 'INR', discount: 10 },
        duration: { totalHours: 90, totalLectures: 75, totalWeeks: 16 },
        teacher: teachers[3]._id,
        rating: { average: 4.5, count: 67 },
        enrolledCount: 234,
        isPublished: true,
        isFeatured: false,
        tags: ['C++', 'Competitive Programming', 'DSA', 'Algorithms', 'ICPC'],
        prerequisites: ['Good grasp of C++ basics', 'Basic knowledge of arrays, strings, and recursion', 'Familiarity with STL containers'],
        whatYouWillLearn: [
          'Master advanced data structures like Segment Tree, Fenwick Tree, and Trie',
          'Solve Dynamic Programming problems using pattern recognition',
          'Implement Graph algorithms including flow and matching',
          'Achieve Expert rating on Codeforces and 5-star on CodeChef',
          'Crack coding rounds of top tech companies',
        ],
        language: 'English',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Advanced C++ & STL', topics: ['Templates & Iterators', 'STL Algorithms', 'Custom Comparators', 'Bitset & Bit Manipulation', 'Policy-Based Data Structures'] },
          { week: 2, title: 'Advanced Data Structures', topics: ['Segment Tree with Lazy Propagation', 'Fenwick Tree', 'Trie & Suffix Array', 'Disjoint Set Union', 'Square Root Decomposition'] },
          { week: 3, title: 'Dynamic Programming Deep Dive', topics: ['DP on Grids & Strings', 'Knapsack & Variants', 'Digit DP', 'DP on Trees', 'Bitmask DP'] },
          { week: 4, title: 'Graph Algorithms', topics: ['BFS/DFS Advanced', 'Topological Sort', 'Shortest Path Algorithms', 'Minimum Spanning Tree', 'Strongly Connected Components'] },
          { week: 5, title: 'Advanced Graph & String Algorithms', topics: ['Network Flow (Max Flow)', 'Bipartite Matching', 'KMP & Z-Algorithm', 'Manacher\'s Algorithm', 'Heavy Light Decomposition'] },
          { week: 6, title: 'Contest Strategy & Practice', topics: ['Codeforces Round Practice', 'CodeChef Long Challenge', 'ICPC Problem Solving', 'Google Kickstart Prep'] },
        ],
      },
      {
        title: 'NEET UG Physics: Concept & Numericals',
        slug: 'neet-ug-physics-concept-and-numericals',
        description: {
          short: 'Focused NEET Physics preparation covering NCERT-aligned theory with emphasis on numerical problem-solving and previous year questions.',
          full: 'This course is specifically designed for NEET UG aspirants who find Physics challenging. Each chapter starts with NCERT theory and gradually progresses to application-level problems. Special focus is on the 45 numerical questions that appear in NEET Physics. The course includes chapter-wise formula sheets, shortcut techniques for numericals, and 20 full-length mock tests with detailed solutions. Weekly doubt-clearing sessions ensure no topic is left unclear.',
        },
        category: 'NEET',
        level: 'Intermediate',
        price: { amount: 12999, currency: 'INR', discount: 15 },
        duration: { totalHours: 100, totalLectures: 85, totalWeeks: 20 },
        teacher: teachers[0]._id,
        rating: { average: 4.7, count: 143 },
        enrolledCount: 678,
        isPublished: true,
        isFeatured: false,
        tags: ['NEET', 'Physics', 'Medical', 'Numericals', 'NCERT'],
        prerequisites: ['Class 11 and 12 Physics (NCERT)', 'Basic mathematics'],
        whatYouWillLearn: [
          'Master NEET Physics syllabus with NCERT-aligned approach',
          'Solve numerical problems 40% faster using shortcut techniques',
          'Identify question patterns and predict probable questions',
          'Score 150+ marks in NEET Physics section confidently',
          'Complete 45 questions in 60 minutes with accuracy',
        ],
        language: 'Hinglish',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Mechanics for NEET', topics: ['Motion in Straight Line', 'Motion in Plane', 'Laws of Motion', 'Work Energy Power', 'System of Particles'] },
          { week: 2, title: 'Properties of Matter', topics: ['Mechanical Properties of Solids', 'Mechanical Properties of Fluids', 'Thermal Properties', 'Thermodynamics', 'Kinetic Theory'] },
          { week: 3, title: 'Electrostatics & Current', topics: ['Electric Charges & Fields', 'Electrostatic Potential', 'Capacitance', 'Current Electricity', 'Ohm\'s Law & Circuits'] },
          { week: 4, title: 'Magnetism & EMI', topics: ['Moving Charges & Magnetism', 'Magnetism & Matter', 'Electromagnetic Induction', 'Alternating Current'] },
          { week: 5, title: 'Optics & Waves', topics: ['Ray Optics', 'Wave Optics', 'Electromagnetic Waves', 'Waves', 'Wave Motion & Sound'] },
          { week: 6, title: 'Modern Physics', topics: ['Dual Nature of Matter', 'Atoms & Nuclei', 'Semiconductor Devices', 'Communication Systems'] },
        ],
      },
      {
        title: 'Data Structures & Algorithms: Interview Preparation',
        slug: 'data-structures-algorithms-interview-preparation',
        description: {
          short: 'Complete DSA interview preparation for product-based companies with 300+ hand-picked problems from Google, Microsoft, Amazon, and Flipkart.',
          full: 'This intensive program is designed for engineering students and professionals preparing for coding interviews at top tech companies. The curriculum covers every essential data structure and algorithm with a focus on interview patterns. You will solve 300+ curated problems organized by difficulty and topic. Each module includes live coding sessions, homework assignments, and mock interviews. The course also covers system design basics and behavioral interview preparation.',
        },
        category: 'Skill Development',
        level: 'Intermediate',
        price: { amount: 8499, currency: 'INR', discount: 25 },
        duration: { totalHours: 70, totalLectures: 55, totalWeeks: 10 },
        teacher: teachers[3]._id,
        rating: { average: 4.6, count: 156 },
        enrolledCount: 890,
        isPublished: true,
        isFeatured: true,
        tags: ['DSA', 'Interview Prep', 'Algorithms', 'Coding Interview', 'Placement'],
        prerequisites: ['Basic knowledge of any programming language (preferably Java/Python/C++)', 'Understanding of basic data structures'],
        whatYouWillLearn: [
          'Master all data structures: Arrays, Linked Lists, Trees, Graphs, Heaps, Hash Tables',
          'Solve LeetCode Medium/Hard problems in under 30 minutes',
          'Crack coding rounds at Amazon, Google, Microsoft, and Flipkart',
          'Understand time & space complexity analysis deeply',
          'Confidently handle system design and behavioral interviews',
        ],
        language: 'English',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Arrays & Strings', topics: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'String Manipulation', 'Pattern Matching'] },
          { week: 2, title: 'Linked Lists & Stacks', topics: ['Singly & Doubly LL', 'Fast & Slow Pointers', 'Stack Applications', 'Monotonic Stack', 'Queue & Deque'] },
          { week: 3, title: 'Trees & Graphs', topics: ['Binary Trees & BST', 'Tree Traversals', 'Graph Representations', 'DFS & BFS', 'Topological Sort'] },
          { week: 4, title: 'Heaps & Hash Tables', topics: ['Heap Operations', 'Priority Queue', 'Hash Map Design', 'Collision Handling', 'Custom Hashing'] },
          { week: 5, title: 'Dynamic Programming', topics: ['1D DP Patterns', '2D DP', '0/1 Knapsack', 'LIS & LCS', 'DP on Trees'] },
          { week: 6, title: 'Advanced Topics & Mock Interviews', topics: ['Trie & Union Find', 'Segment Tree', 'System Design Basics', 'Mock Interviews', 'Resume Tips'] },
        ],
      },
      {
        title: 'ICSE Class 10 Physics: Board Exam Ready',
        slug: 'icse-class-10-physics-board-exam-ready',
        description: {
          short: 'Complete ICSE Class 10 Physics preparation with numerical practice, derivations, and board-specific exam strategy for 95+ marks.',
          full: 'Tailored specifically for ICSE Class 10 students, this course covers the entire Physics syllabus as per the latest ICSE board guidelines. Each chapter is explained with real-life examples and applications. Special emphasis is placed on numerical problems (which carry 40% weightage), derivations, and diagram-based questions. The course includes ICSE-style practice papers, previous 10 year board paper solutions, and the unique "ICSE Physics Scoring Guide" that reveals marking schemes and examiner expectations.',
        },
        category: 'ICSE',
        level: 'Beginner',
        price: { amount: 6999, currency: 'INR', discount: 20 },
        duration: { totalHours: 60, totalLectures: 50, totalWeeks: 16 },
        teacher: teachers[0]._id,
        rating: { average: 4.5, count: 88 },
        enrolledCount: 345,
        isPublished: true,
        isFeatured: false,
        tags: ['ICSE', 'Class 10', 'Physics', 'Board Exams', 'Numericals'],
        prerequisites: ['Class 9 ICSE Physics basics'],
        whatYouWillLearn: [
          'Master all ICSE Class 10 Physics topics as per board syllabus',
          'Solve numerical problems step-by-step with proper unit handling',
          'Draw and label Physics diagrams perfectly for full marks',
          'Write derivations and explanations that match ICSE marking scheme',
          'Score 95+ marks in ICSE Class 10 Board Physics exam',
        ],
        language: 'English',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Force, Work, Energy & Power', topics: ['Force & Turning Effect', 'Uniform Circular Motion', 'Work & Energy', 'Power & Commercial Unit', 'Simple Machines'] },
          { week: 2, title: 'Light: Reflection & Refraction', topics: ['Reflection at Plane & Spherical Surfaces', 'Mirror Formula', 'Refraction Through Glass', 'Lens Formula', 'Power of Lens'] },
          { week: 3, title: 'Sound & Calorimetry', topics: ['Sound Waves', 'Characteristics of Sound', 'Loudness & Pitch', 'Specific Heat Capacity', 'Latent Heat'] },
          { week: 4, title: 'Electricity & Magnetism', topics: ['Ohm\'s Law & Resistance', 'Household Circuits', 'Magnetic Effect of Current', 'Electromagnetic Induction', 'AC Generator'] },
        ],
      },
      {
        title: 'UPSC Civil Services: General Studies Foundation',
        slug: 'upsc-civil-services-general-studies-foundation',
        description: {
          short: 'Comprehensive foundation course for UPSC Civil Services Prelims and Mains GS with current affairs integration and answer writing practice.',
          full: 'A holistic preparation course for UPSC Civil Services Examination covering all four General Studies papers. The course integrates static subjects with dynamic current affairs through a structured timeline. Each GS paper is taught by subject matter experts with years of UPSC mentoring experience. The course includes 200+ hours of lectures, 50+ answer writing sessions, 20 full-length mock tests for Prelims, and personalized mentorship. Special focus is on developing the analytical and writing skills essential for Mains.',
        },
        category: 'Competitive Exams',
        level: 'Advanced',
        price: { amount: 49999, currency: 'INR', discount: 10 },
        duration: { totalHours: 300, totalLectures: 240, totalWeeks: 48 },
        teacher: teachers[2]._id,
        rating: { average: 4.4, count: 56 },
        enrolledCount: 178,
        isPublished: true,
        isFeatured: false,
        tags: ['UPSC', 'Civil Services', 'IAS', 'General Studies', 'Current Affairs'],
        prerequisites: ['Graduation in any discipline', 'Basic awareness of Indian polity and history', 'Willingness to read and write extensively'],
        whatYouWillLearn: [
          'Master the entire UPSC Prelims and Mains GS syllabus',
          'Develop answer writing skills that fetch top marks in Mains',
          'Integrate current affairs with static subjects seamlessly',
          'Solve CSAT paper with speed and accuracy',
          'Build confidence to crack UPSC Civil Services in first attempt',
        ],
        language: 'English',
        mode: 'Live Online',
        syllabus: [
          { week: 1, title: 'Indian History: Ancient & Medieval', topics: ['Indus Valley Civilization', 'Vedic Period', 'Mauryan & Gupta Empires', 'Delhi Sultanate', 'Mughal Empire'] },
          { week: 2, title: 'Modern India & Freedom Struggle', topics: ['British Expansion in India', 'Revolt of 1857', 'Indian National Congress', 'Gandhian Movements', 'Partition & Independence'] },
          { week: 3, title: 'Indian Polity & Constitution', topics: ['Making of Constitution', 'Fundamental Rights & Duties', 'Parliament & State Legislature', 'Judiciary System', 'Federal Structure'] },
          { week: 4, title: 'Geography: Physical & Human', topics: ['Geomorphology', 'Climatology', 'Oceanography', 'Indian Physical Geography', 'Population & Settlements'] },
          { week: 5, title: 'Indian Economy & Development', topics: ['Economic Planning', 'Banking & Finance', 'Budget & Taxation', 'Agriculture & Food Security', 'Infrastructure'] },
          { week: 6, title: 'Environment, Science & Tech', topics: ['Ecology & Biodiversity', 'Climate Change', 'Conservation Efforts', 'Space Technology', 'Biotechnology & Health'] },
        ],
      },
    ]);

    const blogs = await Blog.insertMany([
      {
        title: 'How to Score 90% in CBSE Board Exams: A Strategic Study Plan',
        slug: 'how-to-score-90-percent-cbse-board-exams-strategic-study-plan',
        content: `Preparing for CBSE Board Exams can be overwhelming, but with the right strategy, scoring 90% and above is absolutely achievable. Here is a comprehensive study plan that has helped thousands of our students achieve outstanding results.

Start Early, Start Smart: Begin your preparation at least 6 months before the exams. Create a realistic timetable that allocates 6-8 hours daily for studies, with proper breaks every 90 minutes. The Pomodoro technique works wonders for maintaining focus.

Master NCERT First: CBSE questions are predominantly NCERT-based. Read each chapter thoroughly, solve all in-text and end-of-chapter questions. Make concise notes that you can revise in the last month. For subjects like Biology and History, create mind maps and flow charts.

Practice Previous Year Papers: Solve at least 10 years of previous board papers. This helps you understand the question pattern, marking scheme, and time management. Time yourself strictly while solving these papers.

Focus on Weak Areas: Identify your weak chapters early. Dedicate extra time to them. Use online resources and seek help from teachers. Remember, every mark counts in board exams.

Revision is Key: The last 30 days should be solely for revision. Go through your notes, solve mock tests, and focus on formulae and important definitions. Do not start any new topic in the last month.

Stay Healthy: Board exams are a marathon, not a sprint. Eat nutritious food, sleep 7-8 hours, exercise regularly, and take short breaks to relax. A healthy mind retains information better.

At EduServe, we have designed specialized courses that complement your board preparation with expert guidance, doubt-clearing sessions, and comprehensive study materials.`, 
        excerpt: 'A proven 6-month strategic study plan to help CBSE students score 90% and above in board exams. Covers timetable planning, NCERT mastery, revision techniques, and health tips.',
        author: teachers[2]._id,
        category: 'Exam Tips',
        isPublished: true,
        isFeatured: true,
        tags: ['CBSE', 'Board Exams', 'Study Tips', 'Exam Strategy', 'Time Management'],
        readTime: 8,
      },
      {
        title: 'NEET 2026: Subject-Wise Preparation Strategy from an AIIMS Topper',
        slug: 'neet-2026-subject-wise-preparation-strategy-aiims-topper',
        content: `Cracking NEET UG requires a subject-wise strategic approach. Based on insights from our AIIMS Delhi faculty and hundreds of successful students, here is the optimal preparation strategy for each subject.

Biology (50% of Total Marks): This is your scoring zone. NCERT Biology is non-negotiable - read it at least 5 times. Pay attention to every line, diagram, and box. Create color-coded notes for plant families, animal phyla, and human physiology. Use mnemonics extensively. Practice diagram-based questions daily.

Physics (25% of Total Marks): Focus on concepts, not rote learning. Create a formula sheet for each chapter and revise it daily. Solve numerical problems from DC Pandey and previous year papers. The key is to practice at least 50 problems per chapter. Pay special attention to Mechanics, Electrodynamics, and Modern Physics which together account for 60% of the Physics paper.

Chemistry (25% of Total Marks): Divide into three parts. For Physical Chemistry, practice numerical problems daily. For Organic Chemistry, make reaction maps and practice mechanisms. For Inorganic Chemistry, use periodic table trends and color-coded flashcards. NCERT is crucial for Inorganic Chemistry questions.

Weekly Test Strategy: Take one full syllabus mock test every Sunday. Analyze your mistakes thoroughly. Maintain an error log and revise those concepts. Gradually increase your test frequency to 3 tests per week in the last two months.

Time Management: In the exam hall, attempt Biology first (45 minutes), then Chemistry (35 minutes), and Physics last (40 minutes). This ensures you secure maximum marks in your strong areas first.

Remember, consistency beats intensity. Study 8-10 hours daily with focus, take one day off per week for recreation, and trust the process.`, 
        excerpt: 'Detailed subject-wise preparation strategy for NEET UG 2026 including Biology, Physics, and Chemistry tips, test strategy, and time management from AIIMS faculty.',
        author: teachers[4]._id,
        category: 'Exam Tips',
        isPublished: true,
        isFeatured: true,
        tags: ['NEET', 'Medical', 'Preparation Strategy', 'Biology', 'AIIMS'],
        readTime: 10,
      },
      {
        title: 'From IIT Bombay to EduServe: My Journey of Building India\'s Learning Platform',
        slug: 'from-iit-bombay-to-eduserve-journey-building-india-learning-platform',
        content: `Every great educational journey has a story behind it. Here is mine - the story of how EduServe was born from a dream to transform Indian education.

My tryst with teaching began during my PhD days at IIT Bombay when I started tutoring underprivileged students for JEE Advanced. I realized that quality education was accessible only to those who could afford expensive coaching in metro cities. Students from tier-2 and tier-3 cities, despite having equal potential, lacked access to good teachers.

In 2018, I founded EduServe with a simple mission: make world-class education accessible and affordable for every Indian student. We started with two courses and 50 students. Today, we serve over 10,000 students across 200+ cities in India.

What sets EduServe apart is our focus on Indian education needs. Our courses are designed specifically for Indian competitive exams, our content is in Hinglish for better comprehension, and our pricing is tailored for the Indian market. Every teacher on our platform is vetted for both subject expertise and teaching ability.

Our students have achieved remarkable success - 127 selections in IIT-JEE Advanced 2025, 340+ NEET qualifiers, and thousands of CBSE board toppers. But what makes me most proud is the message from a student in a small town in Bihar who said, "Sir, for the first time, I felt like I had a chance."

The journey continues. We are building AI-powered personalized learning paths, expanding to more regional languages, and partnering with schools across India. Our goal is to reach every student who dreams big, regardless of where they come from.

To every student reading this: your background does not determine your future. With the right guidance and hard work, you can achieve anything. Let EduServe be your partner in this journey.`, 
        excerpt: 'Founder Dr. Vikram Singh shares the inspiring journey of building EduServe from IIT Bombay to a platform serving 10,000+ students across 200+ Indian cities.',
        author: admins[0]._id,
        category: 'Success Stories',
        isPublished: true,
        isFeatured: true,
        tags: ['EduServe', 'Founder Story', 'EdTech', 'IIT Bombay', 'Inspiration'],
        readTime: 12,
      },
      {
        title: 'Top 10 Programming Languages to Learn in 2026 for a High-Paying Job',
        slug: 'top-10-programming-languages-2026-high-paying-job',
        content: `The tech industry in India is booming, and choosing the right programming language to learn can make a significant difference in your career trajectory. Here are the top 10 programming languages that will dominate the job market in 2026.

1. Python: Continues to be the most versatile language. Used in data science, AI/ML, web development, and automation. Average salary for Python developers in India ranges from 8-25 LPA.

2. JavaScript: The backbone of web development. With frameworks like React, Node.js, and Next.js dominating the industry, JavaScript skills are in huge demand. Full-stack developers earn 10-30 LPA.

3. TypeScript: Increasingly becoming the standard for large-scale applications. Type safety and better tooling make it preferred over plain JavaScript. 6-20 LPA.

4. Rust: Gaining massive traction for systems programming. Known for memory safety and performance. Used in blockchain, game engines, and cloud infrastructure. 12-35 LPA.

5. Go (Golang): Google\'s language for cloud-native development. Preferred for microservices, containerization tools, and backend systems. 10-28 LPA.

6. Java: Still dominant in enterprise applications, Android development, and large-scale systems. 8-22 LPA.

7. Kotlin: The modern alternative for Android development. Fully interoperable with Java but more concise and safer. 7-20 LPA.

8. C++: Essential for game development, competitive programming, and high-frequency trading systems. 8-30 LPA.

9. SQL: Not a traditional programming language but critical for data roles. Every data scientist, analyst, and backend engineer needs SQL. 5-18 LPA.

10. Swift: For iOS/macOS app development. The Apple ecosystem continues to grow, and Swift developers are well-compensated. 10-25 LPA.

At EduServe, we offer comprehensive courses in Python, JavaScript, C++, and more. Our programming courses are designed by industry professionals and include real-world projects that build your portfolio.`, 
        excerpt: 'A comprehensive guide to the top 10 programming languages for 2026 with salary ranges for the Indian job market. Includes Python, JavaScript, Rust, Go, and more.',
        author: teachers[3]._id,
        category: 'Career Advice',
        isPublished: true,
        isFeatured: false,
        tags: ['Programming', 'Career', 'Jobs', 'Python', 'JavaScript', 'Salary'],
        readTime: 9,
      },
      {
        title: 'JEE Advanced 2026: Complete Preparation Timeline and Study Resources',
        slug: 'jee-advanced-2026-complete-preparation-timeline-study-resources',
        content: `JEE Advanced is undoubtedly one of the toughest engineering entrance exams in the world. However, with a structured preparation plan spanning 18 months, you can crack it with a top rank. Here is the complete timeline.

Months 1-6 (Foundation Phase): Focus on building strong fundamentals in Physics, Chemistry, and Mathematics. Complete Class 12 syllabus alongside JEE preparation. Recommended books: HC Verma for Physics, OP Tandon for Chemistry, RD Sharma for Mathematics. Divide 6-7 hours daily - 2.5 hours each for PCM.

Months 7-12 (Advanced Phase): Dive into advanced problem-solving. Start with IE Irodov for Physics, MS Chouhan for Organic Chemistry, and Cengage Learning for Mathematics. Increase study time to 8-9 hours. Solve chapter-wise previous year questions from the last 20 years.

Months 13-16 (Integration Phase): Start taking full syllabus mock tests every week. Analyze each test thoroughly. Solve 10 mock tests per month from different publishers. Focus on time management and accuracy. Identify weak areas and work on them.

Months 17-18 (Final Polish): Take 3-4 mock tests per week. Revise all formulae, concepts, and shortcuts. Focus on speed and accuracy. Maintain a positive mindset and ensure proper sleep and nutrition.

Resource Recommendations: For Physics, follow Dr. Rajesh Kumar\'s JEE Advanced course on EduServe which covers all topics with problem-solving techniques. For Chemistry, Prof. Priya Sharma\'s course is excellent for organic reaction mechanisms. For Mathematics, Dr. Suresh Patel\'s sessions on calculus and algebra are unparalleled.

Common Mistakes to Avoid: Do not ignore any subject - focus equally on all three. Do not study without solving problems - theory without practice is useless. Do not skip revision - without regular revision, you forget 80% of what you learn within a month.

Remember, JEE Advanced tests your problem-solving ability, not just your knowledge. Practice thinking from first principles and develop multiple approaches to solve each problem.`, 
        excerpt: 'Complete 18-month preparation timeline for JEE Advanced 2026 including foundation phase, advanced problem-solving, mock test strategy, and book recommendations.',
        author: teachers[0]._id,
        category: 'Exam Tips',
        isPublished: true,
        isFeatured: true,
        tags: ['JEE Advanced', 'IIT', 'Preparation Timeline', 'Study Resources', 'Exam Strategy'],
        readTime: 11,
      },
    ]);

    const batches = await Batch.insertMany([
      {
        name: 'JEE Advanced 2026 - Morning Batch (Apr-Sep)',
        course: courses[0]._id,
        teacher: teachers[0]._id,
        startDate: new Date('2026-04-07'),
        endDate: new Date('2026-09-30'),
        schedule: [
          { day: 'Monday', startTime: '06:00', endTime: '08:00' },
          { day: 'Wednesday', startTime: '06:00', endTime: '08:00' },
          { day: 'Friday', startTime: '06:00', endTime: '08:00' },
        ],
        maxStudents: 100,
        enrolledCount: 67,
        status: 'upcoming',
        mode: 'Live Online',
        platform: 'Zoom',
        meetingLink: 'https://zoom.us/j/eduserve-jee-advanced-morning',
        fee: { amount: 24999, currency: 'INR' },
      },
      {
        name: 'NEET UG 2026 - Weekend Intensive Batch',
        course: courses[1]._id,
        teacher: teachers[4]._id,
        startDate: new Date('2026-05-02'),
        endDate: new Date('2026-12-20'),
        schedule: [
          { day: 'Saturday', startTime: '09:00', endTime: '13:00' },
          { day: 'Sunday', startTime: '09:00', endTime: '13:00' },
        ],
        maxStudents: 80,
        enrolledCount: 45,
        status: 'upcoming',
        mode: 'Live Online',
        platform: 'Google Meet',
        meetingLink: 'https://meet.google.com/eduserve-neet-weekend',
        fee: { amount: 19999, currency: 'INR' },
      },
      {
        name: 'Python Data Science - Evening Batch (Jun-Aug)',
        course: courses[3]._id,
        teacher: teachers[3]._id,
        startDate: new Date('2026-06-15'),
        endDate: new Date('2026-08-31'),
        schedule: [
          { day: 'Tuesday', startTime: '19:00', endTime: '21:00' },
          { day: 'Thursday', startTime: '19:00', endTime: '21:00' },
        ],
        maxStudents: 60,
        enrolledCount: 34,
        status: 'upcoming',
        mode: 'Live Online',
        platform: 'Zoom',
        meetingLink: 'https://zoom.us/j/eduserve-python-evening',
        fee: { amount: 5999, currency: 'INR' },
      },
    ]);

    const tests = await Test.insertMany([
      {
        title: 'JEE Advanced Physics - Mechanics Mock Test 1',
        course: courses[0]._id,
        teacher: teachers[0]._id,
        type: 'mock',
        duration: 60,
        totalMarks: 120,
        passingMarks: 48,
        questions: [
          {
            question: 'A particle is projected from the ground with speed u at an angle θ with horizontal. The magnitude of average velocity of the particle from point of projection to highest point of trajectory is:',
            options: ['u cos θ', 'u/2 √(1 + 3 cos²θ)', 'u/2 √(1 + cos²θ)', 'u sin θ'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Average velocity = displacement/time. The displacement from projection to highest point is half the range vector. Calculating gives u/2 √(1 + 3 cos²θ).',
          },
          {
            question: 'A block of mass 5 kg is placed on a rough horizontal surface (μ = 0.4). A horizontal force of 25 N is applied. The frictional force acting on the block is: (g = 10 m/s²)',
            options: ['25 N', '20 N', '15 N', '30 N'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Maximum friction = μ mg = 0.4 × 5 × 10 = 20 N. Since applied force 25 N > 20 N, kinetic friction = 20 N acts.',
          },
          {
            question: 'A uniform rod of mass M and length L is suspended from one end. Its time period as a physical pendulum is:',
            options: ['2π √(L/3g)', '2π √(2L/3g)', '2π √(L/g)', '2π √(2L/g)'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'For a physical pendulum, T = 2π √(I/mgd). Here I = ML²/3 about end, d = L/2. So T = 2π √(2L/3g).',
          },
          {
            question: 'Two satellites of masses m and 2m are orbiting earth in circular orbits of radii R and 2R respectively. The ratio of their orbital speeds is:',
            options: ['1 : 1', '√2 : 1', '1 : √2', '2 : 1'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Orbital speed v = √(GM/r), independent of satellite mass. So v ∝ 1/√r, ratio = √(2R/R) = √2 : 1.',
          },
          {
            question: 'A ball is dropped from a height of 20 m. After striking the ground, it rebounds to a height of 5 m. The coefficient of restitution is:',
            options: ['0.25', '0.5', '0.75', '1.0'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'e = √(h₂/h₁) = √(5/20) = √(0.25) = 0.5. Coefficient of restitution is the ratio of relative speeds after and before collision.',
          },
          {
            question: 'A mass m is attached to a spring of spring constant k. The system is placed on a horizontal frictionless surface. The maximum compression in the spring when the mass is given a velocity v towards the spring is:',
            options: ['√(m/k) v', 'v √(m/k)', 'v √(k/m)', 'v² √(m/k)'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'By energy conservation: ½mv² = ½kx², so x = v √(m/k). All kinetic energy converts to spring potential energy.',
          },
          {
            question: 'A liquid of density ρ flows through a horizontal pipe of varying cross-section. At a point where cross-sectional area is A, the velocity is v. The pressure at this point is P. At another point where area is A/2, the pressure will be:',
            options: ['P + ½ρv²', 'P - ½ρv²', 'P + ¾ρv²', 'P - ¾ρv²'],
            correctAnswer: 3,
            marks: 4,
            negativeMarks: 1,
            explanation: 'By continuity: A₁v₁ = A₂v₂, so v₂ = 2v. By Bernoulli: P₂ = P + ½ρ(v² - 4v²) = P - ¾ρv².',
          },
          {
            question: 'The moment of inertia of a thin spherical shell of mass M and radius R about its diameter is:',
            options: ['(2/5)MR²', '(2/3)MR²', '(1/3)MR²', '(5/3)MR²'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'For a thin spherical shell, I = (2/3)MR² about any diameter. For a solid sphere, it is (2/5)MR².',
          },
        ],
        isPublished: true,
        scheduledDate: new Date('2026-05-15'),
        deadlineDate: new Date('2026-05-16'),
        attemptsAllowed: 1,
      },
      {
        title: 'NEET Biology - Human Physiology Weekly Test',
        course: courses[1]._id,
        teacher: teachers[4]._id,
        type: 'weekly',
        duration: 45,
        totalMarks: 90,
        passingMarks: 36,
        questions: [
          {
            question: 'Which of the following is NOT a function of the liver?',
            options: ['Bile production', 'Detoxification of drugs', 'Production of insulin', 'Storage of glycogen'],
            correctAnswer: 2,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Insulin is produced by beta cells of the pancreas, not the liver. Liver produces bile, detoxifies drugs, and stores glycogen.',
          },
          {
            question: 'The maximum amount of air that can be expired after a maximum inspiration is called:',
            options: ['Tidal volume', 'Vital capacity', 'Total lung capacity', 'Expiratory reserve volume'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Vital capacity is the maximum volume of air that can be expelled from the lungs after a maximum inspiration.',
          },
          {
            question: 'Which part of the nephron is responsible for maximum water reabsorption?',
            options: ['Bowman\'s capsule', 'Proximal convoluted tubule', 'Loop of Henle', 'Distal convoluted tubule'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'PCT reabsorbs about 65-70% of filtered water along with glucose, amino acids, and electrolytes.',
          },
          {
            question: 'The hormone that triggers ovulation in human females is:',
            options: ['FSH', 'LH', 'Estrogen', 'Progesterone'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'LH surge (Luteinizing Hormone) triggers ovulation - the release of the mature ovum from the Graafian follicle.',
          },
          {
            question: 'Blood group with no antigens on RBC surface but both antibodies in plasma is:',
            options: ['A', 'B', 'AB', 'O'],
            correctAnswer: 3,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Blood group O has no A or B antigens on RBCs but has both anti-A and anti-B antibodies in plasma.',
          },
          {
            question: 'Which of the following is NOT a part of the human brainstem?',
            options: ['Medulla oblongata', 'Pons', 'Cerebellum', 'Midbrain'],
            correctAnswer: 2,
            marks: 4,
            negativeMarks: 1,
            explanation: 'Cerebellum is part of the hindbrain but is not included in the brainstem. Brainstem consists of medulla, pons, and midbrain.',
          },
          {
            question: 'The cardiac cycle lasts about 0.8 seconds. The duration of ventricular systole is approximately:',
            options: ['0.1 sec', '0.3 sec', '0.5 sec', '0.7 sec'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 1,
            explanation: 'In a 0.8 sec cardiac cycle, ventricular systole lasts about 0.3 seconds and atrial systole about 0.1 seconds.',
          },
        ],
        isPublished: true,
        scheduledDate: new Date('2026-05-10'),
        deadlineDate: new Date('2026-05-11'),
        attemptsAllowed: 1,
      },
      {
        title: 'CBSE Class 12 Mathematics - Calculus Chapter Test',
        course: courses[2]._id,
        teacher: teachers[2]._id,
        type: 'chapter',
        duration: 90,
        totalMarks: 80,
        passingMarks: 32,
        questions: [
          {
            question: '∫(e^x)(sin x + cos x) dx equals:',
            options: ['e^x sin x + C', 'e^x cos x + C', 'e^x(sin x - cos x) + C', 'e^x tan x + C'],
            correctAnswer: 0,
            marks: 4,
            negativeMarks: 0,
            explanation: 'Let I = ∫e^x sin x dx + ∫e^x cos x dx. Using integration by parts or noting that d/dx(e^x sin x) = e^x(sin x + cos x).',
          },
          {
            question: 'If y = tan⁻¹(√(1 + x²) - x), then dy/dx at x = 0 is:',
            options: ['0', '1/2', '1', '-1/2'],
            correctAnswer: 3,
            marks: 4,
            negativeMarks: 0,
            explanation: 'Substitute x = tan θ, then y = tan⁻¹(sec θ - tan θ) = tan⁻¹((1 - sin θ)/cos θ) = tan⁻¹(tan(π/4 - θ/2)) = π/4 - θ/2. So dy/dx = -1/2 × 1/(1+x²). At x=0, dy/dx = -1/2.',
          },
          {
            question: 'The area bounded by the curve y = x³, x-axis, and ordinates x = 1 and x = 2 is:',
            options: ['3.75 sq units', '3 sq units', '4 sq units', '4.5 sq units'],
            correctAnswer: 0,
            marks: 4,
            negativeMarks: 0,
            explanation: 'Area = ∫₁² x³ dx = [x⁴/4]₁² = 16/4 - 1/4 = 4 - 0.25 = 3.75 square units.',
          },
          {
            question: 'The differential equation (d²y/dx²)³ + (dy/dx)² + y = 0 is of order:',
            options: ['1', '2', '3', '6'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 0,
            explanation: 'Order of a differential equation is the highest order derivative present. Here d²y/dx² is the highest, so order = 2.',
          },
          {
            question: 'If A = [2 3; 1 2] and I is 2×2 identity matrix, then A² - 4A + I equals:',
            options: ['Zero matrix', 'Identity matrix', 'A', '2A'],
            correctAnswer: 0,
            marks: 4,
            negativeMarks: 0,
            explanation: 'A² = [7 12; 4 7]. A² - 4A + I = [7 12; 4 7] - [8 12; 4 8] + [1 0; 0 1] = [0 0; 0 0].',
          },
          {
            question: 'The angle between the lines (x-1)/2 = (y+2)/3 = (z-3)/4 and (x+1)/1 = (y-1)/2 = z/3 is:',
            options: ['cos⁻¹(16/√406)', 'cos⁻¹(20/√406)', 'cos⁻¹(24/√406)', 'cos⁻¹(26/√406)'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 0,
            explanation: 'cos θ = |a₁a₂ + b₁b₂ + c₁c₂|/(√(a₁²+b₁²+c₁²)√(a₂²+b₂²+c₂²)) = |2+6+12|/(√29 × √14) = 20/√406.',
          },
          {
            question: 'A bag contains 4 red and 6 black balls. Two balls are drawn at random. The probability that they are of different colors is:',
            options: ['8/15', '4/15', '12/25', '2/5'],
            correctAnswer: 0,
            marks: 4,
            negativeMarks: 0,
            explanation: 'P(different) = (4×6)/(10C2) = 24/45 = 8/15. Alternatively: P(red then black) + P(black then red).',
          },
          {
            question: 'If vectors a, b, c form a right-handed system and |a| = |b| = |c| = 1, then a.(b × c) equals:',
            options: ['0', '1', '-1', '±1'],
            correctAnswer: 1,
            marks: 4,
            negativeMarks: 0,
            explanation: 'For a right-handed orthonormal system, scalar triple product a.(b×c) = 1 (positive one).',
          },
        ],
        isPublished: true,
        scheduledDate: new Date('2026-04-20'),
        deadlineDate: new Date('2026-04-22'),
        attemptsAllowed: 2,
      },
    ]);

    const enrollments = await Enrollment.insertMany([
      {
        student: students[0]._id,
        course: courses[0]._id,
        status: 'active',
        progress: { completedLectures: 45, totalLectures: 200, percentage: 22.5, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_JEE001', razorpayPaymentId: 'pay_JEE001', amount: 24999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[1]._id,
        course: courses[1]._id,
        status: 'active',
        progress: { completedLectures: 60, totalLectures: 150, percentage: 40, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_NEET001', razorpayPaymentId: 'pay_NEET001', amount: 19999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[2]._id,
        course: courses[2]._id,
        status: 'active',
        progress: { completedLectures: 30, totalLectures: 100, percentage: 30, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_CBSE001', razorpayPaymentId: 'pay_CBSE001', amount: 9999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[3]._id,
        course: courses[3]._id,
        status: 'active',
        progress: { completedLectures: 20, totalLectures: 65, percentage: 30.8, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_PY001', razorpayPaymentId: 'pay_PY001', amount: 5999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[4]._id,
        course: courses[4]._id,
        status: 'active',
        progress: { completedLectures: 15, totalLectures: 100, percentage: 15, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_CHEM001', razorpayPaymentId: 'pay_CHEM001', amount: 14999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[5]._id,
        course: courses[5]._id,
        status: 'active',
        progress: { completedLectures: 10, totalLectures: 75, percentage: 13.3, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_CP001', razorpayPaymentId: 'pay_CP001', amount: 12999, currency: 'INR', status: 'completed' },
      },
      {
        student: students[0]._id,
        course: courses[7]._id,
        status: 'active',
        progress: { completedLectures: 8, totalLectures: 55, percentage: 14.5, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_DSA001', razorpayPaymentId: 'pay_DSA001', amount: 8499, currency: 'INR', status: 'completed' },
      },
      {
        student: students[6]._id,
        course: courses[0]._id,
        status: 'active',
        progress: { completedLectures: 5, totalLectures: 200, percentage: 2.5, lastAccessed: new Date() },
        paymentInfo: { razorpayOrderId: 'order_JEE002', razorpayPaymentId: 'pay_JEE002', amount: 24999, currency: 'INR', status: 'completed' },
      },
    ]);

    const contacts = await Contact.insertMany([
      {
        name: 'Rahul Verma',
        email: 'rahul.verma@example.com',
        phone: '9789012345',
        subject: 'Inquiry about JEE Advanced Course Payment Plans',
        message: 'Hello, I am interested in the IIT-JEE Advanced 2026 Complete Physics course. I wanted to know if there is an EMI option available for the course fee. Also, can I attend a demo class before enrolling? I am from Jaipur and would like to understand the batch timings for the morning batch.',
        status: 'new',
      },
      {
        name: 'Meena Joshi',
        email: 'meena.joshi@example.com',
        phone: '9876501234',
        subject: 'Corporate Training Partnership for Data Science',
        message: 'I am the HR Head at TechVision India Pvt Ltd based in Pune. We are looking for a corporate training partner to train our 50 employees in Data Science with Python. We need a customized 3-month program with weekend classes. Please share your corporate training brochure and pricing details. Our team size is 50 and we are targeting July 2026 start.',
        status: 'new',
      },
    ]);

    logger.info('Seed data inserted successfully');
    logger.info(`  - ${admins.length} admins`);
    logger.info(`  - ${teachers.length} teachers`);
    logger.info(`  - ${students.length} students`);
    logger.info(`  - ${courses.length} courses`);
    logger.info(`  - ${blogs.length} blog posts`);
    logger.info(`  - ${batches.length} batches`);
    logger.info(`  - ${tests.length} tests`);
    logger.info(`  - ${enrollments.length} enrollments`);
    logger.info(`  - ${contacts.length} contact inquiries`);

    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
