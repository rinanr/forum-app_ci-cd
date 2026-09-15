describe('Login Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Login berhasil',
        data: {
          token: 'token-test-cypress',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Berhasil mendapatkan profile',
        data: {
          user: {
            id: 'user-test',
            name: 'User Test',
            email: 'user@example.com',
            avatar: null,
          },
        },
      },
    }).as('profileRequest');
  });

  it('harus berhasil login dan masuk ke halaman utama', () => {
    // Skenario:
    // 1. Pengguna membuka halaman login
    // 2. Pengguna mengisi email dan password
    // 3. Pengguna menekan tombol Login
    // 4. Sistem memproses login
    // 5. Sistem mengambil data profile pengguna
    // 6. Pengguna diarahkan ke halaman utama

    cy.visit('http://localhost:5173/login');

    cy.get('#email').type('user@example.com');
    cy.get('#password').type('password123');

    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    cy.url().should('eq', 'http://localhost:5173/');
  });
});