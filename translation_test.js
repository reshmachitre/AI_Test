

var anthropicProvider = SalsifyAI.anthropicProvider(secret_value('anthropic-key'));
result =  anthropicProvider.generateText('Sample prompt', {
  debugPrompt: true,
  max_tokens: 100
});


const changesetParams = {
  changeset_id: context.changeset_id, // Optional, if updating existing
  target_item_id: context.entity.id,   // Required: the ID of the item
  target_item_type: context.entity.type,        // Required: type of the item (e.g. "Product")
  proposed_changes: [
    { property_id: "name", values: ["french value", "french value 2"] },
  ], // Required: the changes to apply, can be an array of objects
  status: "open",  // Optional: status of the changeset ("open", "closed", "applied")
  accepted: true,  // Optional: accept or reject changes
  new_changeset: false,  // Optional: whether to create a new changeset
  flow_locale_id: "fr-CA"  // Optional: if localization is needed
};

// Call the changeset_save method with the above parameters
changeset_save(changesetParams);
changesetParams
// Function to simulate calling the Ruby method (this is just a placeholder)
function changeset_save(params) {
  console.log("Calling changeset_save with the following parameters:", params);
  params
  
  // Here you would invoke the backend API or server-side code that calls the Ruby method.
  // For example, using fetch or other methods to make an HTTP request to your backend.
}
