import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.systeme.io/api';
const API_KEY = process.env.SYSTEME_IO_API_KEY;
const TAG_ID = 1051471; // The ID of the "portfolio contact" tag

async function makeRequest(endpoint, method, body = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'X-API-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function getContactId(email) {
  const response = await makeRequest(`/contacts?email=${encodeURIComponent(email)}`, 'GET');
  if (response && response.items && response.items.length > 0) {
    return response.items[0].id;
  }
  return null;
}

async function createContact(contactData) {
  const response = await makeRequest('/contacts', 'POST', contactData);
  return response.id;
}

async function addTagToContact(contactId) {
  await makeRequest(`/contacts/${contactId}/tags`, 'POST', { tagId: TAG_ID });
}

export async function POST(request) {
  try {
    const { firstname, lastname, email, phone, service, message } = await request.json();

    const contactData = {
      email: email,
      locale: "en",
      fields: [
        {
          slug: "first_name",
          value: firstname
        },
        {
          slug: "surname",
          value: lastname
        },
        {
          slug: "phone_number",
          value: phone
        },
        {
          slug: "service",
          value: service
        },
        {
          slug: "message_id",
          value: message
        }
      ]
    };

    // Step 1: Check if contact exists
    let contactId = await getContactId(email);

    // Step 2: If contact doesn't exist, create it
    if (!contactId) {
      contactId = await createContact(contactData);
    } else {
      // If contact exists, update it
      await makeRequest(`/contacts/${contactId}`, 'PUT', contactData);
    }

    // Step 3: Add tag to contact
    await addTagToContact(contactId);

    return NextResponse.json({ message: 'Contact processed and tagged successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}