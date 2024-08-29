import { NextResponse } from 'next/server';

export async function POST(request) {
  const { firstname, lastname, email, phone, service, message } = await request.json();

  const payload = {
    email: email,
    locale: "en",
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    fields: [
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

  try {
    const response = await fetch('https://api.systeme.io/api/contacts', {
      method: 'POST',
      headers: {
        'X-API-Key': process.env.SYSTEME_IO_API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
    } else {
      const errorData = await response.text();
      return NextResponse.json({ message: 'Form submission failed', error: errorData }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}