# Roles, Permissions and Access Control

## Objective

Define secure role based access control for business websites and applications.

## Roles

Create only the roles required by the project.

Typical roles:

[ ] Super Admin  
[ ] Admin  
[ ] Manager  
[ ] Staff  
[ ] Customer  

## Permissions

Support granular permissions such as:

[ ] Create  
[ ] Read  
[ ] Update  
[ ] Delete  
[ ] Export  
[ ] Approve  
[ ] Publish  
[ ] Manage Settings  

## Rules

Authorization must be enforced server side.

Never trust role or permission values supplied by the frontend.

## Access Scope

Where required, restrict access by:

[ ] Organization  
[ ] Company  
[ ] Department  
[ ] Location  
[ ] Ownership  

## Audit

Record important permission and access changes in audit logs.

## Final Checklist

[ ] Roles defined  
[ ] Permissions defined  
[ ] Server authorization implemented  
[ ] Admin routes protected  
[ ] API routes protected  
[ ] Unauthorized access tested  