const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addRealisticArticles() {
  try {
    console.log('🚀 Adding realistic Polish logistics articles...');

    const realisticArticles = [
      {
        title: 'Nowe przepisy dotyczące czasu pracy kierowców wchodzą w życie',
        originalUrl: 'https://trans.info/nowe-przepisy-kierowcy-2024',
        sourceName: 'trans.info',
        publishedAt: new Date('2024-01-20T08:30:00Z'),
        summaryPoints: [
          'Wprowadzenie maksymalnego czasu pracy 56 godzin tygodniowo',
          'Obowiązkowe przerwy co 4,5 godziny jazdy',
          'Nowe wymagania dotyczące rejestracji czasu pracy'
        ],
        whyItMatters: 'Te zmiany bezpośrednio wpłyną na planowanie tras i koszty operacyjne firm transportowych.',
        tags: ['przepisy', 'kierowcy', 'czas pracy', 'transport']
      },
      {
        title: 'Wzrost cen paliw o 12% - wpływ na branżę TSL',
        originalUrl: 'https://logistyka.net.pl/wzrost-cen-paliw-2024',
        sourceName: 'logistyka.net.pl',
        publishedAt: new Date('2024-01-19T14:15:00Z'),
        summaryPoints: [
          'Ceny ON wzrosły o 12% w porównaniu do grudnia 2023',
          'Firmy wprowadzają dodatkowe opłaty paliwowe',
          'Analiza wpływu na konkurencyjność polskich przewoźników'
        ],
        whyItMatters: 'Wzrost cen paliw wymaga renegocjacji umów i może wpłynąć na rentowność firm transportowych.',
        tags: ['paliwa', 'koszty', 'TSL', 'transport']
      },
      {
        title: 'Automatyzacja magazynów - nowe technologie w Polsce',
        originalUrl: 'https://transport-publiczny.pl/automatyzacja-magazynów',
        sourceName: 'transport-publiczny.pl',
        publishedAt: new Date('2024-01-18T11:45:00Z'),
        summaryPoints: [
          'Wprowadzenie robotów mobilnych w magazynach Amazon',
          'Systemy automatycznego kompletowania zamówień',
          'Inwestycje w automatyzację w Polsce'
        ],
        whyItMatters: 'Automatyzacja może znacząco obniżyć koszty operacyjne i zwiększyć wydajność procesów magazynowych.',
        tags: ['automatyzacja', 'magazyn', 'technologie', 'Amazon']
      },
      {
        title: 'Brak kierowców - problem branży transportowej',
        originalUrl: 'https://transport-logistyka.pl/brak-kierowców-2024',
        sourceName: 'transport-logistyka.pl',
        publishedAt: new Date('2024-01-17T16:20:00Z'),
        summaryPoints: [
          'Brak 50 tysięcy wykwalifikowanych kierowców w Polsce',
          'Wzrost wynagrodzeń o 15% w branży transportowej',
          'Strategie rekrutacji firm logistycznych'
        ],
        whyItMatters: 'Brak kierowców może prowadzić do opóźnień w dostawach i wzrostu kosztów operacyjnych.',
        tags: ['kierowcy', 'rekrutacja', 'rynek pracy', 'TSL']
      },
      {
        title: 'Nowe połączenia kolejowe dla towarów - CPK',
        originalUrl: 'https://logistyka.net.pl/nowe-polaczenia-kolejowe-cpk',
        sourceName: 'logistyka.net.pl',
        publishedAt: new Date('2024-01-16T09:10:00Z'),
        summaryPoints: [
          'Planowane nowe trasy kolejowe dla towarów',
          'Zmniejszenie obciążenia dróg krajowych',
          'Korzyści ekologiczne transportu kolejowego'
        ],
        whyItMatters: 'Transport kolejowy może być bardziej opłacalny i ekologiczny dla długodystansowych przewozów.',
        tags: ['kolej', 'CPK', 'ekologia', 'infrastruktura']
      },
      {
        title: 'E-commerce boom - wyzwania dla logistyki',
        originalUrl: 'https://trans.info/ecommerce-boom-logistyka',
        sourceName: 'trans.info',
        publishedAt: new Date('2024-01-15T13:30:00Z'),
        summaryPoints: [
          'Wzrost sprzedaży online o 25% w 2023 roku',
          'Nowe wymagania dotyczące szybkich dostaw',
          'Rozwój centrów logistycznych w Polsce'
        ],
        whyItMatters: 'Wzrost e-commerce wymaga dostosowania infrastruktury logistycznej i procesów dostaw.',
        tags: ['e-commerce', 'dostawy', 'logistyka', 'online']
      },
      {
        title: 'Elektryczne samochody dostawcze - przyszłość transportu',
        originalUrl: 'https://transport-publiczny.pl/elektryczne-dostawcze',
        sourceName: 'transport-publiczny.pl',
        publishedAt: new Date('2024-01-14T10:45:00Z'),
        summaryPoints: [
          'Wprowadzenie elektrycznych samochodów dostawczych',
          'Programy wsparcia dla firm transportowych',
          'Infrastruktura ładowania w Polsce'
        ],
        whyItMatters: 'Elektryfikacja flot może obniżyć koszty operacyjne i poprawić wizerunek ekologiczny firm.',
        tags: ['elektryczne', 'dostawcze', 'ekologia', 'transport']
      },
      {
        title: 'Brexit - wpływ na polskie firmy transportowe',
        originalUrl: 'https://logistyka.net.pl/brexit-transport-polskie-firmy',
        sourceName: 'logistyka.net.pl',
        publishedAt: new Date('2024-01-13T15:20:00Z'),
        summaryPoints: [
          'Nowe procedury celne dla transportu do UK',
          'Wzrost kosztów operacyjnych o 8%',
          'Strategie adaptacji polskich firm'
        ],
        whyItMatters: 'Brexit wymaga dostosowania procesów i może wpłynąć na konkurencyjność polskich przewoźników.',
        tags: ['Brexit', 'cło', 'UK', 'procedury']
      }
    ];

    for (const article of realisticArticles) {
      // Check if article already exists
      const existingArticle = await prisma.article.findUnique({
        where: { originalUrl: article.originalUrl }
      });

      if (existingArticle) {
        console.log(`⏭️  Article already exists: ${article.title}`);
        continue;
      }

      await prisma.article.create({
        data: article
      });
      console.log(`✅ Created article: ${article.title}`);
    }

    console.log('\n📊 Articles added successfully!');
    
    // Display the count of articles in the database
    const count = await prisma.article.count();
    console.log(`📚 Total articles in database: ${count}`);

  } catch (error) {
    console.error('❌ Error adding articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addRealisticArticles(); 