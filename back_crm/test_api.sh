#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Function to check response
check_response() {
    if [[ $1 == *"error"* ]]; then
        echo -e "${RED}Failed: $2${NC}"
        echo $1
    else
        echo -e "${GREEN}Success: $2${NC}"
    fi
}

# Base URL
API_URL="http://localhost:5000/api"

print_header "1. Authentication Tests"

# Test Admin Login
echo "Testing admin login..."
ADMIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "admin@example.com",
        "password": "admin123"
    }')
ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
check_response "$ADMIN_RESPONSE" "Admin Login"

# Test Sales User Login
echo -e "\nTesting sales user login..."
SALES_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "sales@example.com",
        "password": "sales123"
    }')
SALES_TOKEN=$(echo $SALES_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
check_response "$SALES_RESPONSE" "Sales Login"

print_header "2. Customer Management"

# Create a new customer
echo "Creating new customer..."
CUSTOMER_RESPONSE=$(curl -s -X POST "$API_URL/customers" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d '{
        "name": "Test Company Ltd",
        "email": "test@testcompany.com",
        "phone": "+1122334455",
        "company": "Test Company",
        "status": "active",
        "customerSource": "website"
    }')
CUSTOMER_ID=$(echo $CUSTOMER_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
check_response "$CUSTOMER_RESPONSE" "Create Customer"

# Get all customers
echo -e "\nGetting all customers..."
CUSTOMERS_RESPONSE=$(curl -s -X GET "$API_URL/customers" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$CUSTOMERS_RESPONSE" "Get All Customers"

# Get specific customer
echo -e "\nGetting specific customer..."
CUSTOMER_GET_RESPONSE=$(curl -s -X GET "$API_URL/customers/$CUSTOMER_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$CUSTOMER_GET_RESPONSE" "Get Specific Customer"

print_header "3. Lead Management"

# Create a new lead
echo "Creating new lead..."
LEAD_RESPONSE=$(curl -s -X POST "$API_URL/leads" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $SALES_TOKEN" \
    -d "{
        \"title\": \"Test Project\",
        \"description\": \"New test project opportunity\",
        \"status\": \"new\",
        \"value\": 50000,
        \"priority\": \"high\",
        \"customerId\": \"$CUSTOMER_ID\",
        \"source\": \"website\"
    }")
LEAD_ID=$(echo $LEAD_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
check_response "$LEAD_RESPONSE" "Create Lead"

# Get all leads
echo -e "\nGetting all leads..."
LEADS_RESPONSE=$(curl -s -X GET "$API_URL/leads" \
    -H "Authorization: Bearer $SALES_TOKEN")
check_response "$LEADS_RESPONSE" "Get All Leads"

print_header "4. Activity Management"

# Create a new activity
echo "Creating new activity..."
ACTIVITY_RESPONSE=$(curl -s -X POST "$API_URL/activities" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $SALES_TOKEN" \
    -d "{
        \"type\": \"call\",
        \"subject\": \"Initial Contact\",
        \"description\": \"First contact with customer\",
        \"status\": \"pending\",
        \"priority\": \"high\",
        \"customerId\": \"$CUSTOMER_ID\",
        \"leadId\": \"$LEAD_ID\"
    }")
ACTIVITY_ID=$(echo $ACTIVITY_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
check_response "$ACTIVITY_RESPONSE" "Create Activity"

# Get all activities
echo -e "\nGetting all activities..."
ACTIVITIES_RESPONSE=$(curl -s -X GET "$API_URL/activities" \
    -H "Authorization: Bearer $SALES_TOKEN")
check_response "$ACTIVITIES_RESPONSE" "Get All Activities"

print_header "5. Payment Management"

# Create a new payment
echo "Creating new payment..."
PAYMENT_RESPONSE=$(curl -s -X POST "$API_URL/payments" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "{
        \"amount\": 5000,
        \"currency\": \"USD\",
        \"status\": \"pending\",
        \"paymentMethod\": \"credit_card\",
        \"customerId\": \"$CUSTOMER_ID\",
        \"description\": \"Initial payment\"
    }")
PAYMENT_ID=$(echo $PAYMENT_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
check_response "$PAYMENT_RESPONSE" "Create Payment"

# Get all payments
echo -e "\nGetting all payments..."
PAYMENTS_RESPONSE=$(curl -s -X GET "$API_URL/payments" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$PAYMENTS_RESPONSE" "Get All Payments"

print_header "6. Update Operations"

# Update customer
echo "Updating customer..."
UPDATE_CUSTOMER_RESPONSE=$(curl -s -X PUT "$API_URL/customers/$CUSTOMER_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d '{
        "name": "Updated Test Company",
        "phone": "+9876543210"
    }')
check_response "$UPDATE_CUSTOMER_RESPONSE" "Update Customer"

# Update lead
echo -e "\nUpdating lead..."
UPDATE_LEAD_RESPONSE=$(curl -s -X PUT "$API_URL/leads/$LEAD_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $SALES_TOKEN" \
    -d '{
        "status": "qualified",
        "priority": "medium"
    }')
check_response "$UPDATE_LEAD_RESPONSE" "Update Lead"

print_header "7. Delete Operations"

# Delete activity
echo "Deleting activity..."
DELETE_ACTIVITY_RESPONSE=$(curl -s -X DELETE "$API_URL/activities/$ACTIVITY_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$DELETE_ACTIVITY_RESPONSE" "Delete Activity"

# Delete payment
echo -e "\nDeleting payment..."
DELETE_PAYMENT_RESPONSE=$(curl -s -X DELETE "$API_URL/payments/$PAYMENT_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$DELETE_PAYMENT_RESPONSE" "Delete Payment"

# Delete lead
echo -e "\nDeleting lead..."
DELETE_LEAD_RESPONSE=$(curl -s -X DELETE "$API_URL/leads/$LEAD_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$DELETE_LEAD_RESPONSE" "Delete Lead"

# Delete customer
echo -e "\nDeleting customer..."
DELETE_CUSTOMER_RESPONSE=$(curl -s -X DELETE "$API_URL/customers/$CUSTOMER_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
check_response "$DELETE_CUSTOMER_RESPONSE" "Delete Customer"

print_header "Test Summary"
echo -e "${GREEN}All tests completed!${NC}" 