import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

// Assuming these components exist in your project
import CTABanner from '../components/common/CTABanner';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 50px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 50px;
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(241, 102, 10, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

const FAQCategories = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CategoryButton = styled.button`
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.light};
  color: ${({ active, theme }) => 
    active ? theme.colors.light : theme.colors.secondary};
  border: 2px solid ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.lightGray};
  border-radius: 30px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.lightGray};
    transform: translateY(-2px);
  }
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  h3 {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
    flex: 1;
  }
  
  .icon {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  
  p {
    margin-top: 0;
  }
  
  ul {
    padding-left: ${({ theme }) => theme.spacing.lg};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  
  // Sample FAQ categories
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'process', name: 'Process & Installation' },
    { id: 'care', name: 'Care & Maintenance' },
    { id: 'pricing', name: 'Pricing & Payment' },
    { id: 'ppf', name: 'Paint Protection Film' }
  ];
  
  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: 'What is a vehicle wrap?',
      answer: 'A vehicle wrap is a series of vinyl graphics or decals that are applied directly over the original paint of a vehicle. The wrap can be a solid color change, a custom design with graphics and text, or a combination of both. High-quality wraps use premium vinyl materials that protect the original paint while allowing for complete customization of the vehicle\'s appearance.',
      category: 'general'
    },
    {
      id: 2,
      question: 'How long does a vehicle wrap last?',
      answer: 'The lifespan of a vehicle wrap depends on several factors including the quality of materials, installation expertise, exposure to elements, and maintenance. Generally, a high-quality wrap professionally installed can last:\n\n• 5-7 years for premium cast vinyl wraps\n• 3-5 years for calendared vinyl wraps\n\nWraps that are exposed to harsh conditions like extreme sunlight, severe weather, or frequent high-pressure washing may have a shorter lifespan. Proper care and maintenance can help extend the life of your wrap.',
      category: 'general'
    },
    {
      id: 3,
      question: 'Will a wrap damage my paint?',
      answer: 'When professionally installed and removed, vehicle wraps actually protect your original paint from UV rays, minor scratches, and small debris. The adhesive used in quality wraps is designed to be removable without damaging the factory paint, provided the original paint was in good condition before wrapping.\n\nHowever, if your vehicle has aftermarket paint, paint damage, or oxidation, there could be issues during removal. It\'s important to have your vehicle\'s paint assessed by a professional before wrapping to ensure it\'s in suitable condition.',
      category: 'general'
    },
    {
      id: 4,
      question: 'How much does a vehicle wrap cost?',
      answer: 'The cost of a vehicle wrap varies widely depending on several factors:\n\n• Vehicle size and complexity (cars typically start at $2,500-$3,500, while larger vehicles like SUVs and trucks range from $3,500-$5,000+)\n• Type of wrap (solid colors vs. custom designs)\n• Quality of materials used\n• Complexity of the design\n• Additional services like design work\n\nPartial wraps, which only cover portions of the vehicle, start around $1,000-$2,000 depending on coverage area. For an accurate quote, we recommend scheduling a consultation where we can assess your specific vehicle and requirements.',
      category: 'pricing'
    },
    {
      id: 5,
      question: 'How long does the installation process take?',
      answer: 'The installation time depends on the complexity of the wrap and the vehicle type:\n\n• Partial wraps: 1-2 days\n• Full car wraps: 3-5 days\n• Complex designs or larger vehicles: 5-7 days\n\nOur installation process is thorough and includes proper vehicle preparation, careful application, and quality checks to ensure the best results. We'll provide you with a specific timeframe when you schedule your service.',
      category: 'process'
    },
    {
      id: 6,
      question: 'How do I care for my wrapped vehicle?',
      answer: 'Proper care will extend the life of your wrap:\n\n• Hand wash with mild automotive soap and water\n• Avoid high-pressure washes and automatic car washes with brushes\n• Clean bird droppings, tree sap, and insect remains promptly as they can be acidic\n• Use microfiber cloths for washing and drying\n• Apply a silicone-free polymer sealant designed for wraps every 3-4 months\n• Park in shade or garage when possible to reduce UV exposure\n• Avoid abrasive polishes and waxes\n\nWe provide detailed care instructions after installation and offer maintenance services to keep your wrap looking its best.',
      category: 'care'
    },
    {
      id: 7,
      question: 'Can you wrap leased vehicles?',
      answer: 'Yes, wraps are perfect for leased vehicles because they can be removed without damaging the original paint when professionally installed and removed. This allows you to customize your leased vehicle while still returning it to stock condition at the end of your lease term. Just make sure to plan for professional removal before returning the vehicle.',
      category: 'general'
    },
    {
      id: 8,
      question: 'What is the difference between a wrap and paint protection film (PPF)?',
      answer: 'While both are vinyl products applied to vehicles, they serve different primary purposes:\n\n• Vehicle Wraps: Primarily for aesthetics and customization. They change the appearance of your vehicle with colors and designs while offering some basic protection.\n\n• Paint Protection Film (PPF): Primarily for protection. PPF is a clear or slightly tinted urethane film designed specifically to shield your vehicle\'s paint from rock chips, scratches, and environmental damage. Premium PPF has self-healing properties that allow minor scratches to disappear with heat.\n\nMany customers choose to combine both products, using PPF on high-impact areas and wraps for style and branding.',
      category: 'ppf'
    },
    {
      id: 9,
      question: 'Do you offer warranties on your wraps?',
      answer: 'Yes, we offer warranties on our installation workmanship and the vinyl materials. Our premium wraps come with a manufacturer\'s warranty that covers defects like excessive fading, cracking, peeling, and discoloration under normal use conditions. The length of warranty depends on the specific materials used. Additionally, we provide our own workmanship guarantee that covers installation-related issues. Detailed warranty information will be provided with your service agreement.',
      category: 'pricing'
    },
    {
      id: 10,
      question: 'What is the process for getting my vehicle wrapped?',
      answer: 'Our vehicle wrap process includes:\n\n1. Consultation: We discuss your vision, vehicle details, and provide options that match your goals and budget.\n\n2. Design: Our designers create a custom concept or help you select from premium vinyl options.\n\n3. Approval: You review and approve the final design and quote.\n\n4. Scheduling: We set an installation date and provide preparation instructions.\n\n5. Preparation: Your vehicle is thoroughly cleaned and prepped to ensure perfect vinyl adhesion.\n\n6. Installation: Our certified installers apply the wrap with precision in our climate-controlled facility.\n\n7. Inspection: We perform a detailed quality check to ensure every edge and seam is perfect.\n\n8. Delivery: You receive your transformed vehicle along with care instructions.',
      category: 'process'
    },
    {
      id: 11,
      question: 'How should I prepare my vehicle before bringing it in for wrapping?',
      answer: 'To ensure the best results for your vehicle wrap, please:\n\n• Wash your vehicle 1-2 days before but avoid waxing or polishing\n• Remove any aftermarket accessories that might interfere with the wrap\n• Repair any significant paint damage or rust\n• Ensure the vehicle is free of personal items\n• Bring the vehicle with at least a quarter tank of fuel\n• Make us aware of any recent paint work (should be fully cured, typically 30+ days)\n\nOur team will perform a thorough cleaning and preparation before installation, but starting with a relatively clean vehicle helps the process.',
      category: 'process'
    },
    {
      id: 12,
      question: 'What payment methods do you accept and do you offer financing?',
      answer: 'We accept multiple payment methods including credit/debit cards, cash, checks, and bank transfers. For larger projects, we typically require a 50% deposit to secure your appointment, with the balance due upon completion.\n\nWe also offer financing options through our partners to help make your vehicle transformation more affordable. During your consultation, we can discuss payment plans and financing solutions tailored to your budget.',
      category: 'pricing'
    }
  ];
  
  // Filter FAQs based on category and search query
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Toggle FAQ item expansion
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </Title>
        <Subtitle>
          Find answers to common questions about vehicle wraps, paint protection film,
          and our services. Can't find what you're looking for? Contact us directly.
        </Subtitle>
      </PageHeader>
      
      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search questions..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      
      <FAQCategories>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </FAQCategories>
      
      <FAQContainer>
        <AnimatePresence>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <FAQItem
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FAQQuestion onClick={() => toggleItem(faq.id)}>
                  <h3>{faq.question}</h3>
                  <div className="icon">
                    {expandedItems[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </FAQQuestion>
                
                <AnimatePresence>
                  {expandedItems[faq.id] && (
                    <FAQAnswer
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('•')) {
                          const listItems = paragraph.split('•').filter(item => item.trim());
                          return (
                            <ul key={index}>
                              {listItems.map((item, i) => (
                                <li key={i}>{item.trim()}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={index}>{paragraph}</p>;
                      })}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))
          ) : (
            <NoResults>
              <h3>No matching questions found</h3>
              <p>Try adjusting your search or category selection, or contact us directly with your question.</p>
            </NoResults>
          )}
        </AnimatePresence>
      </FAQContainer>
      
      <CTABanner 
        title="Still Have Questions?"
        subtitle="Our team is ready to help with any questions you might have about our services."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </PageContainer>
  );
};

export default FAQPage; 