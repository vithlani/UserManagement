namespace UserManagementSystem.Helpers.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message) : base(message) { }
    }

    public class UsernameAlreadyExistsException : Exception
    {
        public UsernameAlreadyExistsException(string message) : base(message) { }
    }
}
