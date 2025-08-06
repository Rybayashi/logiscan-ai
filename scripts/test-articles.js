const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestArticles() {
  try {
    console.log('Creating test articles...');

    const testArticles = [
      {
        title: 'Nowe regulacje dla transportu drogowego w Polsce',
        originalUrl: 'https://example.com/article1',
        sourceName: 'trans.info',
        publishedAt: new Date('2024-01-15T10:00:00Z'),
        summaryPoints: [
          'Wprowadzenie nowych przepisów dotyczących czasu pracy kierowców',
          'Zmiany w systemie kontroli drogowej',
          'Nowe wymagania dla firm transportowych'
        ],
        whyItMatters: 'Te zmiany bezpośrednio wpłyną na koszty operacyjne firm transportowych i wymagają dostosowania procesów.',
        tags: ['regulacje', 'transport drogowy', 'prawo']
      },
      {
        title: 'Wzrost cen paliw wpływa na logistykę',
        originalUrl: 'https://example.com/article2',
        sourceName: 'logistyka.net.pl',
        publishedAt: new Date('2024-01-14T14:30:00Z'),
        summaryPoints: [
          'Ceny paliw wzrosły o 15% w ostatnim miesiącu',
          'Firmy logistyczne wprowadzają dodatkowe opłaty paliwowe',
          'Analiza wpływu na koszty transportu'
        ],
        whyItMatters: 'Wzrost cen paliw bezpośrednio przekłada się na koszty transportu i może wymagać renegocjacji umów.',
        tags: ['paliwa', 'koszty', 'transport']
      },
      {
        title: 'Automatyzacja w magazynach - nowe technologie',
        originalUrl: 'https://example.com/article3',
        sourceName: 'transport-publiczny.pl',
        publishedAt: new Date('2024-01-13T09:15:00Z'),
        summaryPoints: [
          'Wprowadzenie robotów mobilnych w magazynach',
          'Systemy automatycznego kompletowania zamówień',
          'Koszty i korzyści automatyzacji'
        ],
        whyItMatters: 'Automatyzacja może znacząco obniżyć koszty operacyjne i zwiększyć wydajność procesów magazynowych.',
        tags: ['automatyzacja', 'magazyn', 'technologie']
      },
      {
        title: 'Problemy z dostępnością kierowców w Polsce',
        originalUrl: 'https://example.com/article4',
        sourceName: 'transport-logistyka.pl',
        publishedAt: new Date('2024-01-12T16:45:00Z'),
        summaryPoints: [
          'Brak wykwalifikowanych kierowców na rynku',
          'Wzrost wynagrodzeń w branży transportowej',
          'Strategie rekrutacji firm logistycznych'
        ],
        whyItMatters: 'Brak kierowców może prowadzić do opóźnień w dostawach i wzrostu kosztów operacyjnych.',
        tags: ['kierowcy', 'rekrutacja', 'rynek pracy']
      },
      {
        title: 'Nowe trasy kolejowe dla towarów',
        originalUrl: 'https://example.com/article5',
        sourceName: 'logistyka.net.pl',
        publishedAt: new Date('2024-01-11T11:20:00Z'),
        summaryPoints: [
          'Otwarcie nowych połączeń kolejowych',
          'Zmniejszenie obciążenia dróg',
          'Korzyści ekologiczne transportu kolejowego'
        ],
        whyItMatters: 'Transport kolejowy może być bardziej opłacalny i ekologiczny dla długodystansowych przewozów.',
        tags: ['kolej', 'ekologia', 'infrastruktura']
      }
    ];

    for (const article of testArticles) {
      await prisma.article.create({
        data: article
      });
      console.log(`Created article: ${article.title}`);
    }

    console.log('✅ Test articles created successfully!');
    
    // Display the count of articles in the database
    const count = await prisma.article.count();
    console.log(`Total articles in database: ${count}`);

  } catch (error) {
    console.error('Error creating test articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestArticles(); 