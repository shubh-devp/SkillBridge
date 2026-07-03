const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduServe API',
      description: 'Premium Indian EdTech Platform API',
      version: '1.0.0',
      contact: {
        name: 'EduServe Support',
        email: 'support@eduserve.in',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token to authenticate requests',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            role: { type: 'string', enum: ['student', 'teacher', 'admin'] },
            avatar: { type: 'string' },
            bio: { type: 'string' },
            isActive: { type: 'boolean' },
            isVerified: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Course: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            description: {
              type: 'object',
              properties: {
                short: { type: 'string' },
                full: { type: 'string' },
              },
            },
            category: { type: 'string' },
            level: { type: 'string' },
            price: {
              type: 'object',
              properties: {
                amount: { type: 'number' },
                currency: { type: 'string' },
                discount: { type: 'number' },
              },
            },
            teacher: { type: 'string' },
            rating: {
              type: 'object',
              properties: {
                average: { type: 'number' },
                count: { type: 'number' },
              },
            },
            isPublished: { type: 'boolean' },
            isFeatured: { type: 'boolean' },
          },
        },
        Enrollment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            student: { type: 'string' },
            course: { type: 'string' },
            status: { type: 'string', enum: ['active', 'completed', 'cancelled', 'expired'] },
            progress: {
              type: 'object',
              properties: {
                percentage: { type: 'number' },
                completedLectures: { type: 'number' },
                totalLectures: { type: 'number' },
              },
            },
            enrollmentDate: { type: 'string', format: 'date-time' },
          },
        },
        Blog: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            content: { type: 'string' },
            excerpt: { type: 'string' },
            author: { type: 'string' },
            category: { type: 'string' },
            isPublished: { type: 'boolean' },
            isFeatured: { type: 'boolean' },
            readTime: { type: 'number' },
            views: { type: 'number' },
            likes: { type: 'array', items: { type: 'string' } },
          },
        },
        Batch: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            course: { type: 'string' },
            teacher: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            schedule: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: { type: 'string' },
                  startTime: { type: 'string' },
                  endTime: { type: 'string' },
                },
              },
            },
            maxStudents: { type: 'number' },
            enrolledCount: { type: 'number' },
            status: { type: 'string', enum: ['upcoming', 'ongoing', 'completed', 'cancelled'] },
            mode: { type: 'string' },
          },
        },
        Test: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            course: { type: 'string' },
            teacher: { type: 'string' },
            type: { type: 'string', enum: ['mock', 'weekly', 'chapter', 'full_syllabus'] },
            duration: { type: 'number' },
            totalMarks: { type: 'number' },
            passingMarks: { type: 'number' },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                  marks: { type: 'number' },
                },
              },
            },
          },
        },
        Assignment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            course: { type: 'string' },
            teacher: { type: 'string' },
            dueDate: { type: 'string', format: 'date-time' },
            totalMarks: { type: 'number' },
            isPublished: { type: 'boolean' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            recipient: { type: 'string' },
            type: { type: 'string', enum: ['course', 'enrollment', 'assignment', 'test', 'certificate', 'payment', 'system'] },
            title: { type: 'string' },
            message: { type: 'string' },
            link: { type: 'string' },
            isRead: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Contact: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            subject: { type: 'string' },
            message: { type: 'string' },
            status: { type: 'string', enum: ['new', 'read', 'replied', 'closed'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Certificate: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            student: { type: 'string' },
            course: { type: 'string' },
            certificateId: { type: 'string' },
            issueDate: { type: 'string', format: 'date' },
            grade: { type: 'string' },
            percentage: { type: 'number' },
            isVerified: { type: 'boolean' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication and user management' },
      { name: 'Courses', description: 'Course management and browsing' },
      { name: 'Teachers', description: 'Teacher profiles and management' },
      { name: 'Blogs', description: 'Blog posts and articles' },
      { name: 'Enrollments', description: 'Course enrollment management' },
      { name: 'Tests', description: 'Test and assessment management' },
      { name: 'Assignments', description: 'Assignment management and submission' },
      { name: 'Batches', description: 'Batch management for live courses' },
      { name: 'Wishlist', description: 'Student wishlist management' },
      { name: 'Notifications', description: 'User notification management' },
      { name: 'Contacts', description: 'Contact inquiries and support' },
      { name: 'Dashboard', description: 'Role-based dashboard data' },
      { name: 'Certificates', description: 'Certificate generation and verification' },
      { name: 'Analytics', description: 'Admin analytics and reports' },
    ],
    paths: {
      '/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'phone'],
                  properties: {
                    name: { type: 'string', example: 'Amit Sharma' },
                    email: { type: 'string', format: 'email', example: 'amit.sharma@example.com' },
                    phone: { type: 'string', example: '9876543210' },
                    password: { type: 'string', format: 'password', example: 'Password123' },
                    role: { type: 'string', enum: ['student', 'teacher'], example: 'student' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Validation error' },
            409: { description: 'Email already exists' },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'amit.sharma@example.com' },
                    password: { type: 'string', format: 'password', example: 'Password123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Logout successful' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/auth/refresh-token': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh access token',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    refreshToken: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'New access token generated' },
            401: { description: 'Invalid refresh token' },
          },
        },
      },
      '/auth/forgot-password': {
        post: {
          tags: ['Auth'],
          summary: 'Request password reset',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email'],
                  properties: {
                    email: { type: 'string', example: 'amit.sharma@example.com' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Reset link sent' },
            404: { description: 'Email not found' },
          },
        },
      },
      '/auth/reset-password/{token}': {
        post: {
          tags: ['Auth'],
          summary: 'Reset password with token',
          parameters: [
            { name: 'token', in: 'path', required: true, schema: { type: 'string' } },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['password'],
                  properties: {
                    password: { type: 'string', format: 'password', example: 'NewPass123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Password reset successful' },
            400: { description: 'Invalid or expired token' },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user profile',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'User profile data' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/auth/profile': {
        patch: {
          tags: ['Auth'],
          summary: 'Update user profile',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    bio: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Profile updated' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/auth/password': {
        patch: {
          tags: ['Auth'],
          summary: 'Update password',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['currentPassword', 'newPassword'],
                  properties: {
                    currentPassword: { type: 'string', format: 'password' },
                    newPassword: { type: 'string', format: 'password' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Password updated' },
            401: { description: 'Current password incorrect' },
          },
        },
      },
      '/courses': {
        get: {
          tags: ['Courses'],
          summary: 'Get all courses with filtering and pagination',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
            { name: 'category', in: 'query', schema: { type: 'string' } },
            { name: 'level', in: 'query', schema: { type: 'string' } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'sort', in: 'query', schema: { type: 'string' } },
            { name: 'minPrice', in: 'query', schema: { type: 'number' } },
            { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
          ],
          responses: {
            200: { description: 'List of courses with pagination' },
          },
        },
        post: {
          tags: ['Courses'],
          summary: 'Create a new course',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Course' },
              },
            },
          },
          responses: {
            201: { description: 'Course created' },
            400: { description: 'Validation error' },
            401: { description: 'Not authenticated' },
            403: { description: 'Not authorized' },
          },
        },
      },
      '/courses/featured': {
        get: {
          tags: ['Courses'],
          summary: 'Get featured courses',
          responses: {
            200: { description: 'List of featured courses' },
          },
        },
      },
      '/courses/categories/{category}': {
        get: {
          tags: ['Courses'],
          summary: 'Get courses by category',
          parameters: [
            { name: 'category', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of courses in category' },
          },
        },
      },
      '/courses/{slug}': {
        get: {
          tags: ['Courses'],
          summary: 'Get course by slug',
          parameters: [
            { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Course details' },
            404: { description: 'Course not found' },
          },
        },
      },
      '/courses/{id}': {
        patch: {
          tags: ['Courses'],
          summary: 'Update course',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Course updated' },
            403: { description: 'Not authorized' },
            404: { description: 'Course not found' },
          },
        },
        delete: {
          tags: ['Courses'],
          summary: 'Delete course',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Course deleted' },
            403: { description: 'Not authorized' },
            404: { description: 'Course not found' },
          },
        },
      },
      '/teachers': {
        get: {
          tags: ['Teachers'],
          summary: 'Get all teachers',
          responses: {
            200: { description: 'List of teachers' },
          },
        },
      },
      '/teachers/{id}': {
        get: {
          tags: ['Teachers'],
          summary: 'Get teacher by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Teacher details' },
            404: { description: 'Teacher not found' },
          },
        },
      },
      '/teachers/{id}/courses': {
        get: {
          tags: ['Teachers'],
          summary: 'Get courses taught by a teacher',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of teacher courses' },
          },
        },
      },
      '/teachers/profile': {
        patch: {
          tags: ['Teachers'],
          summary: 'Update teacher profile',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Profile updated' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/blogs': {
        get: {
          tags: ['Blogs'],
          summary: 'Get all published blogs',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
            { name: 'category', in: 'query', schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of blogs with pagination' },
          },
        },
        post: {
          tags: ['Blogs'],
          summary: 'Create a new blog post',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Blog created' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/blogs/featured': {
        get: {
          tags: ['Blogs'],
          summary: 'Get featured blog posts',
          responses: {
            200: { description: 'List of featured blogs' },
          },
        },
      },
      '/blogs/{slug}': {
        get: {
          tags: ['Blogs'],
          summary: 'Get blog by slug',
          parameters: [
            { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Blog details' },
            404: { description: 'Blog not found' },
          },
        },
      },
      '/blogs/{id}/like': {
        post: {
          tags: ['Blogs'],
          summary: 'Toggle like on blog post',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Like toggled' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/enrollments': {
        post: {
          tags: ['Enrollments'],
          summary: 'Enroll in a course',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['courseId'],
                  properties: {
                    courseId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Enrolled successfully' },
            400: { description: 'Already enrolled or validation error' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/enrollments/my': {
        get: {
          tags: ['Enrollments'],
          summary: 'Get my enrollments',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of enrollments' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/enrollments/course/{courseId}': {
        get: {
          tags: ['Enrollments'],
          summary: 'Get enrollments for a course (teacher/admin)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'courseId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of enrollments' },
            401: { description: 'Not authenticated' },
          },
        },
      },
      '/tests/course/{courseId}': {
        get: {
          tags: ['Tests'],
          summary: 'Get tests for a course',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'courseId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of tests' },
          },
        },
      },
      '/tests/{id}': {
        get: {
          tags: ['Tests'],
          summary: 'Get test by ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Test details with questions' },
            404: { description: 'Test not found' },
          },
        },
        post: {
          tags: ['Tests'],
          summary: 'Create a new test',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Test created' },
          },
        },
        patch: {
          tags: ['Tests'],
          summary: 'Update test',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Test updated' },
          },
        },
        delete: {
          tags: ['Tests'],
          summary: 'Delete test',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Test deleted' },
          },
        },
      },
      '/tests/{id}/submit': {
        post: {
          tags: ['Tests'],
          summary: 'Submit test answers',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Test submitted and evaluated' },
          },
        },
      },
      '/tests/results/my': {
        get: {
          tags: ['Tests'],
          summary: 'Get my test results',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of test results' },
          },
        },
      },
      '/assignments/course/{courseId}': {
        get: {
          tags: ['Assignments'],
          summary: 'Get assignments for a course',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'courseId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'List of assignments' },
          },
        },
      },
      '/assignments/submissions/my': {
        get: {
          tags: ['Assignments'],
          summary: 'Get my assignment submissions',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of submissions' },
          },
        },
      },
      '/batches': {
        get: {
          tags: ['Batches'],
          summary: 'Get all batches',
          responses: {
            200: { description: 'List of batches' },
          },
        },
        post: {
          tags: ['Batches'],
          summary: 'Create a new batch',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Batch created' },
          },
        },
      },
      '/batches/upcoming': {
        get: {
          tags: ['Batches'],
          summary: 'Get upcoming batches',
          responses: {
            200: { description: 'List of upcoming batches' },
          },
        },
      },
      '/batches/{id}': {
        get: {
          tags: ['Batches'],
          summary: 'Get batch by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Batch details' },
            404: { description: 'Batch not found' },
          },
        },
        patch: {
          tags: ['Batches'],
          summary: 'Update batch',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Batch updated' },
          },
        },
        delete: {
          tags: ['Batches'],
          summary: 'Delete batch',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Batch deleted' },
          },
        },
      },
      '/wishlist': {
        get: {
          tags: ['Wishlist'],
          summary: 'Get my wishlist',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of wishlist items' },
          },
        },
        post: {
          tags: ['Wishlist'],
          summary: 'Add course to wishlist',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    courseId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Added to wishlist' },
          },
        },
      },
      '/wishlist/{courseId}': {
        delete: {
          tags: ['Wishlist'],
          summary: 'Remove course from wishlist',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'courseId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Removed from wishlist' },
          },
        },
      },
      '/notifications': {
        get: {
          tags: ['Notifications'],
          summary: 'Get my notifications',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
            { name: 'unreadOnly', in: 'query', schema: { type: 'boolean' } },
          ],
          responses: {
            200: { description: 'List of notifications' },
          },
        },
      },
      '/notifications/read-all': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark all notifications as read',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'All marked as read' },
          },
        },
      },
      '/notifications/{id}/read': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark notification as read',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Marked as read' },
          },
        },
      },
      '/contacts': {
        post: {
          tags: ['Contacts'],
          summary: 'Submit a contact inquiry',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'subject', 'message'],
                  properties: {
                    name: { type: 'string', example: 'Rahul Verma' },
                    email: { type: 'string', example: 'rahul@example.com' },
                    phone: { type: 'string', example: '9876543210' },
                    subject: { type: 'string', example: 'Course inquiry' },
                    message: { type: 'string', example: 'I want to know more about ...' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Inquiry submitted' },
          },
        },
        get: {
          tags: ['Contacts'],
          summary: 'Get all contact inquiries (admin)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of inquiries' },
          },
        },
      },
      '/dashboard/student': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get student dashboard data',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard data' },
          },
        },
      },
      '/dashboard/teacher': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get teacher dashboard data',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard data' },
          },
        },
      },
      '/dashboard/admin': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get admin dashboard data',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard data' },
          },
        },
      },
      '/certificates/my': {
        get: {
          tags: ['Certificates'],
          summary: 'Get my certificates',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of certificates' },
          },
        },
      },
      '/certificates/verify/{certificateId}': {
        get: {
          tags: ['Certificates'],
          summary: 'Verify a certificate',
          parameters: [
            { name: 'certificateId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Certificate verified' },
            404: { description: 'Certificate not found' },
          },
        },
      },
      '/analytics/courses': {
        get: {
          tags: ['Analytics'],
          summary: 'Get course analytics (admin)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Course analytics data' },
          },
        },
      },
      '/analytics/users': {
        get: {
          tags: ['Analytics'],
          summary: 'Get user analytics (admin)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'User analytics data' },
          },
        },
      },
      '/analytics/revenue': {
        get: {
          tags: ['Analytics'],
          summary: 'Get revenue analytics (admin)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Revenue analytics data' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
